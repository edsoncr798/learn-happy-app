<script setup lang="ts">
import img_learning from '@/assets/SVG/aprendamos.svg';
import img_palms from '@/assets/SVG/palmas.svg';
import lock_closed from '@/assets/SVG/unlocked.svg';
import gamesStore from '@/components/gameLevels/gameLevels.store';
import { toastController } from '@ionic/vue';

const router = useRouter();
const levels = computed(() => gamesStore.getLevels());

const navigateToLevel = (level: { number: number; isUnlocked: boolean }) => {
  if (level.isUnlocked) {
    router.push({ name: 'NumberLevels', params: { levelNumber: level.number } });
  } else {
    toastController
      .create({
        message: 'nivel bloqueado',
        duration: 3000,
        color: 'warning',
      })
      .then((toast) => toast.present());
  }
};


const goToBack = () =>{
  router.push({name: 'Home'});
}
</script>

<template>
  <ion-content>
    <div class="w-full h-full flex flex-col justify-between items-center background-container relative">
      <ion-img :src="img_learning" class="w-[200px]" />
      <div class="grid -mt-8 grid-cols-2 px-8 w-full grid-flow-row">
        <ion-card
          v-for="level in levels"
          :key="level.number"
          class="text-2xl font-black p-2 bg-[#C9F6F5] relative"
          @click="navigateToLevel(level)"
        >
          <div
            :class="{
              'blur-[2px] cursor-not-allowed': !level.isUnlocked,
            }"
            class="text-center text-black"
          >
            Nivel <br>
            {{ level.number }}
          </div>
          <ion-img v-if="!level.isUnlocked" :src="lock_closed"
                   class="w-1/2 absolute left-[50%] -translate-x-1/2 -translate-y-1/2 top-1/2" />
        </ion-card>
      </div>
      <ion-img :src="img_palms" class="w-[50px]" />

      <ion-button
        fill="clear"
        class="rounded-sm bg-[#C9F6F5] text-black absolute bottom-0 mb-2 right-0 mr-5"
        @click="goToBack"
      >
        Regresar
      </ion-button>
    </div>
  </ion-content>
</template>

<style scoped>

</style>