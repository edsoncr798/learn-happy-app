import { IUser } from '@/models/interfaces';
import { getUserDocSnap } from '@/components/auth/actions/getUser';
import { updateDoc } from 'firebase/firestore';
import setLocalStorageAuth from '@/components/auth/actions/setLocalStorageAuth';
import { toastController } from '@ionic/vue';


const updateProfile = async (userData: IUser) => {
  try {
    const userDoc = await getUserDocSnap();
    if (!userDoc) return;

    await updateDoc(userDoc.ref, {
      ...userData,
      updated_at: new Date(),
    });

    setLocalStorageAuth(userData);

    toastController
      .create({
        message: 'Perfil actualizado correctamente',
        duration: 1000,
        color: 'success',
        position: 'top',
      })
      .then((toast) => toast.present());

  } catch (e) {
    console.log('error:', e);
    toastController
      .create({
        message: 'Error al actualizar el perfil',
        duration: 1000,
        color: 'danger',
        position: 'top',
      })
      .then((toast) => toast.present());
  }
};

export default updateProfile;