import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';
import profileStore from '@/components/auth/profile/profile.store';
import gameLevelsStore from '@/components/gameLevels/gameLevels.store';

// Guarda el progreso del juego
export async function saveProgress(
  userId: string,
  levelId: string,
  gameId: string,
  isLastGame: boolean = false,
) {
  const db = getFirestore();
  const levels = gameLevelsStore.getLevels();
  console.log('entramos');
  const userProgressKey = 'userProgress';

  // Cargar progreso existente desde localStorage
  const localProgress = JSON.parse(
    localStorage.getItem(userProgressKey) || '{}',
  );

  // Actualizar progreso local
  if (!localProgress[levelId]) {
    localProgress[levelId] = { completedGames: 0, games: {} };
  }

  if (!localProgress[levelId].games[gameId]) {
    localProgress[levelId].games[gameId] = { isPainted: true };
    localProgress[levelId].completedGames++;
  }

  try {
    // Guardar progreso en Firestore
    const userDocRef = doc(db, 'userProfile', userId);
    await setDoc(
      userDocRef,
      {
        progress: {
          [levelId]: {
            completedGames: localProgress[levelId].completedGames,
            games: { [gameId]: { isPainted: true } },
          },
        },
      },
      { merge: true },
    );

    // Guardar progreso en localStorage
    localStorage.setItem(userProgressKey, JSON.stringify(localProgress));
    profileStore.setUserProgress(localProgress);
    console.log('Progreso guardado con éxito:', localProgress);

    if (isLastGame) {
      const currentLevel = levels.find((level) => level.uid === levelId);
      if (!currentLevel) {
        console.error('No se encontró el nivel actual:', levelId);
        return false;
      }

      const nextLevel = levels.find(
        (level) => level.levelNumber === currentLevel?.levelNumber + 1,
      );

      if (!nextLevel) {
        console.log('No hay más niveles');
        return false;
      }

      const nextLevelId = nextLevel.uid;

      if (!localProgress[nextLevelId]) {
        localProgress[nextLevelId] = { completedGames: 0, games: {} };

        // Guardar progreso en Firestore
        await setDoc(
          userDocRef,
          {
            progress: {
              [nextLevelId]: {
                completedGames: localProgress[nextLevelId].completedGames,
                games: {},
              },
            },
          },
          { merge: true },
        );

        console.log('Nuevo nivel desbloqueado:', nextLevelId);
        
        // Guardar progreso en localStorage
        localStorage.setItem(userProgressKey, JSON.stringify(localProgress));
        profileStore.setUserProgress(localProgress);
      }
    }

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

  // Intentar cargar progreso desde localStorage
  const localProgress = localStorage.getItem(userProgressKey);

  if (localProgress) {
    console.log('Progreso cargado desde localStorage', localProgress);
    const progress = JSON.parse(localProgress);
    console.log('progreso:', progress);
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
