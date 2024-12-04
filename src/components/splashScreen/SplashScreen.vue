<script setup lang="ts">
import logoApp from '@/assets/SVG/aprendamos.svg'
import palms from '@/assets/SVG/palmas.svg'
import profileStore from '@/components/auth/profile/profile.store';

const router = useRouter();

onMounted( () => {
  setTimeout(() =>{
    const user = localStorage.getItem('user');
    if(user){
      const parseUser = JSON.parse(user);
      profileStore.setUser(parseUser);
      router.push({name: 'Welcome'})
    }else{
      router.push({ name: 'initial-data' });
    }
  }, 3000)
})

</script>

<template>
  <ion-content>
    <div class="relative w-full h-full background-container flex justify-center ion-text-center">
      <ion-img
        class="animate-pulse w-[300px]"
        :src="logoApp"
      >
      </ion-img>
      <ion-img class="absolute bottom-0 mb-10" :src="palms"></ion-img>

    </div>
  </ion-content>
</template>

<style scoped>

</style>