import { collection, getDocs, getFirestore } from 'firebase/firestore';
import { ILevel } from '@/models/interfaces';
import gameLevelsStore from '@/components/gameLevels/gameLevels.store';
import { data } from 'autoprefixer';

export default async function getLevels(): Promise<ILevel[] | any> {
  try {
    const db = getFirestore();
    const levelsRef = collection(db, 'levels');
    const snapshot = await getDocs(levelsRef);

    // Mapeamos los documentos a la estructura de ILevel
    const levels = snapshot.docs.map((doc) => {
      const data = doc.data();
      return {
        uid: doc.id,
        levelNumber: data.levelNumber,
        is_unlocked: data.is_unlocked, // Asegúrate de manejar el caso donde no exista
        created_at: data.created_at,
        updated_at: data.updated_at,
      } as ILevel;
    });

    console.log('Niveles obtenidos:', levels);
    levels.sort((a, b) => a.levelNumber - b.levelNumber);
    gameLevelsStore.setLevels(levels)
    return levels;
  } catch (error) {
    console.error('Error al obtener los niveles', error);
    throw new Error('No se pudieron obtener los niveles');
  }
}