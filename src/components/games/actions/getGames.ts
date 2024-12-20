import { IGame } from '@/models/interfaces';
import {
  collection,
  getDocs,
  getFirestore,
  query,
  where,
} from 'firebase/firestore';
import gamesStore from '@/components/games/games.store';
import profileStore from '@/components/auth/profile/profile.store';

const userGames = computed(() => profileStore.getUserProgressGames());

function unlockedGames(games: IGame[]) {
  if (Object.keys(userGames.value).length === 0) {
    games[0].unlocked = true;
  } else {
    games.forEach((game) => {
      if (userGames.value.includes(game.uid)) {
        game.unlocked = true;
        game.completed = true;
      }
    });

    games.forEach((game, index) => {
      if (index > 0) {
        const previousGame = games[index - 1];
        if (
          previousGame.unlocked &&
          userGames.value.includes(previousGame.uid)
        ) {
          game.unlocked = true;
        }
      }
    });
  }
  return games;
}

export default async function getGames(levelId: string): Promise<IGame[]> {
  try {
    const db = getFirestore();
    const gamesRef = collection(db, 'games');

    const q = query(gamesRef, where('level_id', '==', levelId));
    const snapshot = await getDocs(q);

    let games = snapshot.docs.map((doc) => {
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

    games.sort((a, b) => a.gameNumber - b.gameNumber);
    games = unlockedGames(games);
    gamesStore.setGames(games);
    localStorage.setItem('games', JSON.stringify(games));
    return games;
  } catch (error: any) {
    console.error(
      `Error al obtener juegos del nivel ${levelId}:`,
      error.message || error,
    );
    throw new Error(
      'Error al obtener los juegos. Verifica tu conexión o los permisos de Firestore.',
    );
  }
}
