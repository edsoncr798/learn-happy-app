<script setup lang="ts">

import img_learning from '@/assets/SVG/aprendamos.svg';
import lock_closed from '@/assets/SVG/unlocked.svg';
</script>

<template>
  <div class="w-full h-full flex flex-col justify-between items-center background-container relative">
      <ion-img :src="img_learning" class="w-[200px]" />
      <div class="grid -mt-8 grid-cols-2 px-8 w-full grid-flow-row">
        <ion-card
          v-for="i in 10"
          :key="i"
          class="text-2xl font-black p-2 bg-[#C9F6F5] relative"
        >
          <div
            class="text-center text-black"
          >
            <div class="skeleton-box" style="width: 100px; height: 20px;"></div>
          </div>
          <ion-img
                   class="w-1/2 absolute lef" />
        </ion-card>
      </div>
      <ion-img class="w-[50px]" />

      <ion-button
        fill="clear"
        class="rounded-sm bg-[#C9F6F5] text-black absolute bottom-0 mb-2 right-0 mr-5"
      >
      </ion-button>
    </div>
</template>

<style scoped>
.skeleton-box {
  background-color: #655f5f;
  border-radius: 4px;
  animation: pulse 1.5s infinite ease-in-out;
}

@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #f0f0f0;
  }
  100% {
    background-color: #e0e0e0;
  }
}

</style>