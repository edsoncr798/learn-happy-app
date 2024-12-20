import { getFirestore, doc, getDoc } from "firebase/firestore";
import { IUser, IUserProgress } from "@/models/interfaces";

// Función para obtener el progreso del usuario
export default async function getUserProgress(userId: string): Promise<IUserProgress | null> {
  try {
    const db = getFirestore();
    const userRef = doc(db, "userProfile", userId); // Referencia al documento del usuario
    const userDoc = await getDoc(userRef);

    if (userDoc.exists()) {
      const userData = userDoc.data() as IUser;

      // Si el progreso existe, lo retornamos
      if (userData.progress) {
        return userData.progress;
      } else {
        console.warn("El usuario no tiene progreso registrado.");
        return null;
      }
    } else {
      console.error("El documento del usuario no existe.");
      return null;
    }
  } catch (error) {
    console.error("Error al obtener el progreso del usuario:", error);
    throw new Error("No se pudo obtener el progreso del usuario.");
  }
}
