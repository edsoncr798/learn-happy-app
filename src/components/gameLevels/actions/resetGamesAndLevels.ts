import { collection, getDocs, getFirestore, updateDoc } from 'firebase/firestore';

export const resetGamesAndLevels = async () => {
  try {
    const db = getFirestore();

    // Reseteamos todos los juegos en la colección "games"
    const gamesCollection = collection(db, 'games');
    const gamesSnapshot = await getDocs(gamesCollection);

    const gameUpdates = gamesSnapshot.docs.map((docSnap) => {
      const gameData = docSnap.data();
      if (gameData.gameNumber === 1) {
        return updateDoc(docSnap.ref, {
          unlocked: true,
          completed: false,
        });
      }

      return updateDoc(docSnap.ref, {
        unlocked: false,
        completed: false,
      });
    });

    // Reseteamos todos los niveles en la colección "levels"
    const levelsCollection = collection(db, 'levels');
    const levelsSnapshot = await getDocs(levelsCollection);

    const levelUpdates = levelsSnapshot.docs.map((docSnap) => {
      const levelData = docSnap.data();
      if (levelData.levelNumber === 1) {
        return updateDoc(docSnap.ref, {
          unlocked: true,
        });
      }

      return updateDoc(docSnap.ref, {
        unlocked: false,
      });
    });

    // Ejecutamos todas las actualizaciones en paralelo
    await Promise.all([...gameUpdates, ...levelUpdates]);

    console.log('Juegos y niveles reseteados correctamente');
  } catch (err) {
    console.error('Error al resetear los juegos y niveles:', err);
  }
};
