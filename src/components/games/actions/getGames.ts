import { IGame } from '@/models/interfaces';
import { collection, getDocs, getFirestore, query, where } from 'firebase/firestore';
import gamesStore from '@/components/games/games.store';


export default async function getGames(levelId: string): Promise<IGame[]> {

  try {
    const db = getFirestore();
    const gamesRef = collection(db, 'games');

    // Consulta para filtrar los juegos por level_id
    const q = query(gamesRef, where('level_id', '==', levelId));
    const snapshot = await getDocs(q);


    // Mapeamos los documentos a la estructura de IGame
    const games = snapshot.docs.map(doc => {
      const data = doc.data();
      return {
        uid: doc.id,
        gameNumber: data.gameNumber ?? 0, // Valor por defecto
        level_id: data.level_id ?? '',
        unlocked: data.unlocked ?? false,
        description: data.description ?? '',
        completed: data.completed ?? false,
        colors: data.colors ?? [],
        images: data.images ?? [],
        created_at: data.created_at ?? null,
        updated_at: data.updated_at ?? null,
      } as IGame;
    });

    console.log(`Juegos del nivel ${levelId}`, games);
    games.sort((a, b) => a.gameNumber - b.gameNumber);
    gamesStore.setGames(games);
    return games;
  } catch (error: any) {
    console.error(`Error al obtener juegos del nivel ${levelId}:`, error.message || error);
    throw new Error('Error al obtener los juegos. Verifica tu conexión o los permisos de Firestore.');
  }
}