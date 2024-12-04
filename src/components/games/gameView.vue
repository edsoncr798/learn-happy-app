<script setup lang="ts">

import levelsData from '@/data/games.json'

const route = useRoute();

const levelNumber = parseInt(Array.isArray(route.params.levelNumber) ? route.params.levelNumber[0] : route.params.levelNumber, 10);

//encontramos el nivel correspondiente

const levelData = levelsData.find((level) => level.level === levelNumber);
const games = levelData ? levelData.games : [];


</script>

<template>
  <ion-content>
  <div class="background-container w-full h-full relative">
    <ion-header>
      <ion-toolbar>
        <ion-title>Nivel {{levelNumber}}</ion-title>
      </ion-toolbar>
    </ion-header>

    <div
      v-for="game in games"
      :key="game.id"
      class="h-full flex flex-col">
      <h2>Juego {{game.id}}</h2>
      <ion-img :src="game.image" />

      <div
        :style="{backgroundColor: game.colors[0]}"
        class="w-[100px] h-[100px] rounded-full"
      >

      </div>
    </div>
    
  </div>
  </ion-content>
</template>

<style scoped>

</style>