import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import profileStore from '@/components/auth/profile/profile.store';

export async function saveProgress(
  userId: string,
  levelId: string,
  gameId: string,
) {
  const userProgressKey = 'userProgress';

  const localProgress = JSON.parse(
    localStorage.getItem(userProgressKey) || '{}',
  );

  if (!localProgress[levelId]) {
    localProgress[levelId] = { completedGames: 0, games: {} };
  }

  console.log('localProgress', localProgress);
  console.log('levelId', levelId);
  console.log('gameId', gameId);

  if (!localProgress[levelId].games[gameId]) {
    localProgress[levelId].games[gameId] = { isPainted: true, completed: true };
    localProgress[levelId].completedGames++;
  }

  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'userProfile', userId);
    await setDoc(
      userDocRef,
      {
        progress: {
          [levelId]: {
            completedGames: localProgress[levelId].completedGames,
            games: { [gameId]: { isPainted: true, completed: true } },
          },
        },
      },
      { merge: true },
    );

    // Guardar progreso en localStorage
    localStorage.setItem(userProgressKey, JSON.stringify(localProgress));
    console.log("localProgress", localProgress);
    profileStore.setUserProgress(localProgress);
    console.log('Progreso guardado con éxito:', localProgress);

    return true;
  } catch (error) {
    console.error('Error al guardar el progreso:', error);
    return false;
  }
}

// Carga el progreso del usuario
export async function loadProgress(userId: string) {
  const db = getFirestore();
  const userProgressKey = 'userProgress';

  const localProgress = localStorage.getItem(userProgressKey);

  if (localProgress) {
    const progress = JSON.parse(localProgress);
    profileStore.setUserProgress(progress);
    return progress;
  }

  try {
    // Si no existe en localStorage, cargar desde Firestore
    const userDocRef = doc(db, 'userProfile', userId);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const progress = userData.progress || {};

      // Guardar progreso en localStorage
      localStorage.setItem(userProgressKey, JSON.stringify(progress));
      profileStore.setUserProgress(progress);
      console.log('Progreso cargado desde Firebase:', progress);
      return progress;
    }

    console.warn('No existe progreso en Firebase.');
    return {};
  } catch (error) {
    console.error('Error al cargar el progreso:', error);
    return {};
  }
}

// Verifica si un juego está desbloqueado
export function isGameUnlocked(
  progress: any,
  levelId: string,
  gameId: string,
): boolean {
  return !!progress[levelId]?.games[gameId]?.isPainted;
}
