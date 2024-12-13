import { doc, getDoc, getFirestore, setDoc } from 'firebase/firestore';


export async function initializeUserProgress(userId: string) {
  try {
    const db = getFirestore();
    const userDocRef = doc(db, 'userProfile', userId);
    const userDoc = await getDoc(userDocRef);

    if (!userDoc.exists()) {
      // Documento inicial con todos los niveles y juegos bloqueados
      const initialProgress = {
        progress: {}, // Inicialmente vacío (sin niveles desbloqueados)
      };

      await setDoc(userDocRef, initialProgress);
      console.log('Progreso del usuario inicializado correctamente.');
    } else {
      console.log('El usuario ya tiene un documento de progreso.');
    }
  } catch (error) {
    console.error('Error al inicializar el progreso del usuario:', error);
  }
}