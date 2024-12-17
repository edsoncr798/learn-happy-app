import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';


// Guarda el progreso del juego
export async function saveProgress(userId: string, levelId: string, gameId: string) {
  const db = getFirestore();
  const userProgressKey = 'userProgress';

  // Cargar progreso existente desde localStorage
  const localProgress = JSON.parse(localStorage.getItem(userProgressKey) || '{}');

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

  // Intentar cargar progreso desde localStorage
  const localProgress = localStorage.getItem(userProgressKey);

  if (localProgress) {
    console.log('Progreso cargado desde localStorage');
    return JSON.parse(localProgress);
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
export function isGameUnlocked(progress: any, levelId: string, gameId: string): boolean {
  return !!progress[levelId]?.games[gameId]?.isPainted;
}
