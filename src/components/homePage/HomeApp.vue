<script setup lang="ts">
import img_learning from '@/assets/SVG/aprendamos.svg';
import img_palmas from '@/assets/SVG/palmas.svg';

const router = useRouter();

const goToGame = () => {
  router.push({ name: 'game-levels' });
};

const goToProgress = () => {
  router.push({ name: 'Progress' });
};

const goToProfile = () => {
  router.push({ name: 'Profile' });
};

</script>

<template>
  <ion-content>
    <div class="w-full h-full relative background-container">
      <ion-img :src='img_learning' class="w-3/4 px-4 mx-auto" />

      <div class="w-full flex gap-y-5 flex-col items-center">

        <ion-button
          @click="goToGame"
          size="large"
          fill="clear"
          class="bg-[#C9F6F5] w-3/4 text-black rounded-lg font-mono text-3xl font-black"
        >
          Jugar
        </ion-button>
        <ion-button
          @click="goToProgress"
          size="large"
          fill="clear"
          class="bg-[#C9F6F5] w-3/4 text-black rounded-lg font-mono text-3xl font-black"
        >
          Progreso
        </ion-button>
        <ion-button
          @click="goToProfile"
          size="large"
          fill="clear"
          class="bg-[#C9F6F5] w-3/4 text-black rounded-lg font-mono text-3xl font-black"
        >
          Perfil
        </ion-button>

      </div>


      <ion-img
        :src='img_palmas'
        class="left-[50%] -translate-x-1/2 absolute z-10 bottom-0 mb-10 px-4 mx-auto"
      />
    </div>
  </ion-content>
</template>

<style scoped>

</style>