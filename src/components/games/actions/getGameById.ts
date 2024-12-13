import { firestore } from '@/modules/firebaseConfig';
import { IGame } from '@/models/interfaces';

export default async function getGameById(gameId: string) {
  try{
    return ( await firestore.collection('games').doc(gameId).get()).data() as IGame;
  }catch(error){
    console.error(error);
    return null;
  }
}