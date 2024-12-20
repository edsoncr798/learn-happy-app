import gamesStore from '@/components/games/games.store';

export default function(games: any){
  localStorage.setItem('games', JSON.stringify(games));
  gamesStore.setGames(games);
  console.log('seteando los datos a gamesStorage ');
}