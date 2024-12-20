import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { ILevel } from '@/models/interfaces';
import gameLevelsStore from '@/components/gameLevels/gameLevels.store';
import profileStore from '@/components/auth/profile/profile.store';

const userLevels = computed(() => profileStore.getUserProgressLevels());

function unlockedLevels(levels: ILevel[]) {
  if (Object.keys(userLevels.value).length === 0) {
    levels[0].is_unlocked = true;
  } else {
    levels.forEach((level) => {
      if (userLevels.value[level.uid as any]) {
        level.is_unlocked = true;
      }
    });

    levels.forEach((level, index) => {
      if (index > 0) {
        const previousLevel = levels[index - 1];
        if (previousLevel.is_unlocked) {
          const completedGames = profileStore.getUserCompletedGamesByLevel(
            previousLevel.uid,
          );
          if (completedGames === 5) {
            level.is_unlocked = true;
          }
        }
      }
    });
  }
  return levels;
}

export default async function getLevels(): Promise<ILevel[]> {
  try {
    const db = getFirestore();
    const levelsRef = collection(db, 'levels');
    const snapshot = await getDocs(levelsRef);

    let levels = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        levelNumber: data.levelNumber,
        is_unlocked: data.is_unlocked, // Asegúrate de manejar el caso donde no exista
        created_at: data.created_at,
        updated_at: data.updated_at,
      } as ILevel;
    });

    levels.sort((a, b) => a.levelNumber - b.levelNumber);
    levels = unlockedLevels(levels);
    gameLevelsStore.setLevels(levels);
    localStorage.setItem('levels', JSON.stringify(levels));
    return levels;
  } catch (error) {
    console.error('Error al obtener los niveles', error);
    throw new Error('No se pudieron obtener los niveles');
  }
}
