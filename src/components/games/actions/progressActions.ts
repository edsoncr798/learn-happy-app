import { IUser } from '@/models/interfaces';
import {
  collection,
  doc,
  getDoc,
  getFirestore,
  query,
  updateDoc,
  where,
  limit,
  getDocs,
  orderBy,
  increment
} from 'firebase/firestore';
import { toastController } from '@ionic/vue';
import profileStore from '@/components/auth/profile/profile.store';

export const updateGameState = async (
  levelId: string,
  currentGameId: string,
): Promise<string | null> => {
  try {
    const db = getFirestore();
    const currentGameRef = doc(db, 'games', currentGameId);
    const gamesCollecRef = collection(db, 'games');

    // Marcar el juego actual como completado
    await updateDoc(currentGameRef, {
      completed: true,
    });

    // Intentar desbloquear el siguiente juego
    const nextGameQuery = query(
      gamesCollecRef,
      where('completed', '==', false),
      where('unlocked', '==', false),
      where('level_id', '==', levelId),
      orderBy('gameNumber', 'asc'),
      limit(1),
    );

    const querySnapshot = await getDocs(nextGameQuery);

    if (!querySnapshot.empty) {
      const nextGameDoc = querySnapshot.docs[0];
      await updateDoc(nextGameDoc.ref, {
        unlocked: true,
      });
      return nextGameDoc.id; // Retornar el UID del siguiente juego
    }

    return null; // No hay más juegos disponibles
  } catch (error) {
    console.error('Error actualizando el estado del juego:', error);
    return null; // Fallo
  }
};

export const loadUserProgress = async (userId: string): Promise<IUser | null> => {
  const db = getFirestore();
  const userDocRef = doc(db, 'userProfile', userId);
  const userSnapshot = await getDoc(userDocRef);

  if (userSnapshot.exists()) {
    return userSnapshot.data() as IUser;
  } else {
    console.error('Usuario no encontrado.');
    return null;
  }
};


//Función para actualizar el progreso del usuario al completar un juego.

export const updateProgress = async (
  user: IUser,
  levelId: string,
  gameId: string,
): Promise<boolean> => {
  if (!user.progress) {
    user.progress = {};
  }
// Inicializar progreso del nivel si no existe
  if (!user.progress[levelId]) {
    user.progress[levelId] = { completedGames: 0, games: {} };
  }


  const levelProgress = user.progress[levelId];
  if (!levelProgress.games) {
    levelProgress.games = {};
  }
  // Verificar si el juego ya fue completado
  if (levelProgress.games[gameId]?.isPainted) {
    toastController
      .create({
        message: `El juego ${gameId} ya fue completado. No se actualizará el progreso.`,
        position: 'middle',
        color: 'warning',
        duration: 2000,
      })
      .then((toast) => toast.present());
    return false;
  }

// Marcar el juego como completado
  levelProgress.games[gameId] = { isPainted: true };
  levelProgress.completedGames++;

  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'userProfile', user.uid);

    // Actualizar progreso en Firebase
    await updateDoc(userDocRef, {
      [`progress.${levelId}.completedGames`]: increment(1),
      [`progress.${levelId}.games.${gameId}.isPainted`]: true,
    });

    profileStore.setUserProgress(user);
    localStorage.setItem('userProgress', JSON.stringify(user.progress[levelId]));
    console.log('¡Progreso actualizado con éxito!:', levelProgress.completedGames);
    return true;
  } catch (error) {
    console.error('Error al actualizar el progreso:', error);
    return false; // Indica que hubo un error
  }
};


export const getGameState = async (
  userId: string,
  levelId: string,
  gameId: string,
): Promise<boolean> => {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'userProfile', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      console.error('No se encontró el usuario en la base de datos.');
      return false;
    }

    const userData = userDoc.data();
    const isPainted = userData?.progress?.[levelId]?.games?.[gameId]?.isPainted;

    return !!isPainted; // Retorna true si el juego ya está pintado
  } catch (error) {
    console.error('Error al obtener el estado del juego:', error);
    return false;
  }
};

export async function loadGame(userId: string, levelId: string, gameId: string) {
  const isPainted = await getGameState(userId, levelId, gameId);

  if (isPainted) {
    console.log('El juego ya está pintado. Cargando el estado anterior...');
    // Devuelve true si el juego está pintado
    return true;
  }
  console.log('El juego no ha sido completado. Mostrar interfaz de pintura...');
  return false;
}

export async function completeGame(user: IUser, levelId: string, gameId: string) {
  const success = await updateProgress(user, levelId, gameId);

  if (success) {
    console.log('¡Juego completado y progreso actualizado!');
    return true;
  }
  console.error('Error al completar el juego.');
  return false;
}