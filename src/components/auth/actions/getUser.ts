import { getFirestore, collection, doc, getDoc } from 'firebase/firestore';
import { IUser } from '@/components/auth/profile/profile.store';
import setLocalStorageAuth from '@/components/auth/actions/setLocalStorageAuth';

export async function getUserDoc() {
  try {
    const uid = JSON.parse(localStorage.getItem('user') || '{}').uid;
    if (!uid) return null;

    const db = getFirestore();
    const usersRef = collection(db, 'user_profiles');
    return doc(usersRef, uid);
  } catch (error) {
    console.log(error);
    return null;
  }
}


export async function getUserDocSnap() {
  try {
    const userDoc = await getUserDoc();
    if (!userDoc) return null;
    return await getDoc(userDoc);
  } catch (error) {
    console.log(error);
    return null;
  }
}

export default async function () {
  try{
    const userDocSnap = await getUserDocSnap();
    if (!userDocSnap) return null;
    const user = userDocSnap.data() as IUser;
    if(!userDocSnap.exists()) return null;
    setLocalStorageAuth(user);
    return true;
  } catch (error) {
    console.log(error);
    return null;
  }
}