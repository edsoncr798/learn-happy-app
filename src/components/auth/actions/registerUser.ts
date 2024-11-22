import {doc, setDoc, getFirestore, collection } from 'firebase/firestore'
import { IUser } from '@/components/auth/profile/profile.store';
import { ElMessage } from 'element-plus';

async function registerUser(userData:IUser) {
  try{
    const db = getFirestore();
    //guardamos los datos en una collection llamada "userProfiles"
    const userProfileCollection = collection(db,'user_profiles');

    const userProfileData = {
      uid: userData.uid,
      name: userData.name,
      age: userData.age,
      gender: userData.gender,
       created_at: new Date(),
      updated_at: new Date(),
    };

    const userDoc = doc(userProfileCollection);
    await setDoc(userDoc, userProfileData)
    ElMessage.success('Registro Exitoso')
    return true;
  }catch(error: any){
    console.log(error)
  }
}


export default registerUser