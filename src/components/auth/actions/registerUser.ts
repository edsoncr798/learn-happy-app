import { IUser } from '@/components/auth/profile/profile.store';
import { toastController } from '@ionic/vue';
import { collection, getFirestore, addDoc, doc, updateDoc } from 'firebase/firestore';
import setLocalStorageAuth from '@/components/auth/actions/setLocalStorageAuth';

const registerUser = async (userData: IUser) => {
  try {
    const db = getFirestore();
    const userProfileCollection = collection(db, 'userProfile');
    const docRef = await addDoc(userProfileCollection, {
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
      created_at: new Date(),
      updated_at: new Date(),
    });

    const uid = docRef.id;
    await updateDoc(doc(userProfileCollection, uid), { uid });

    const userProfileData = {
      ...userData,
      uid,
    };
    setLocalStorageAuth(userProfileData);
    toastController
      .create({
        message: 'Registro exitoso',
        duration: 1000,
        color: 'success',
        position: 'top',
      })
      .then((toast) => toast.present());
    return true;
  } catch (e) {
    console.log('error', e);
    toastController
      .create({
        message: 'Error al guardar el usuario',
        duration: 1000,
        color: 'danger',
        position: 'top',
      })
      .then((toast) => toast.present());
    return false;
  }
};


export default registerUser;