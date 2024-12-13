<script setup lang="ts">
import profileStore from '@/components/auth/profile/profile.store';
import logoApp from '@/assets/SVG/aprendamos.svg'
import boy from '@/assets/SVG/niño 1.svg'
import girl from '@/assets/PNG/niña 1.png'
import palms from '@/assets/SVG/palmas.svg'

const user = computed(() => profileStore.getUser());
const router = useRouter();

const startApp = async () => {
  return await router.push({name: 'Home'})
}

</script>

<template>
  <ion-page>
    <ion-content>
      <div class="background-container relative w-full h-full flex flex-col items-center">
        <ion-img class="w-[250px]" :src="logoApp"></ion-img>
        <span class="text-[40px] font-mono font-bold text-center">
        Hola de nuevo <br> <strong class="font-black text-5xl">{{ user.name }}</strong>
      </span>

        <ion-img :src="user.gender == 'Niño' ? boy : girl"  class="mb-10"></ion-img>
        <ion-button @click="startApp" expand="full" fill="solid" shape="round" class="w-full font-mono font-black text-2xl px-4" size="large">Iniciar</ion-button>
        <ion-img class="absolute bottom-0 mb-10" :src="palms"></ion-img>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>