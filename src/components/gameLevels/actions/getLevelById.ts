import { firestore } from '@/modules/firebaseConfig'
import { ILevel } from '@/models/interfaces';

export default async function getLevelById(levelId: string) {
  try {
    return (await firestore.collection('levels').doc(levelId).get()).data() as ILevel;
  } catch (error) {
    console.error('Error obteniendo nivel:', error);
    return null;
  }

}
