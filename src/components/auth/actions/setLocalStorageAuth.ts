import profileStore from '@/components/auth/profile/profile.store';


export default function(user: any) {
  console.log('guardando datos', user);
  localStorage.setItem('user', JSON.stringify(user));
  profileStore.setUser(user);
}