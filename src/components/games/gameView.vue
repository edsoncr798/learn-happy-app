<script setup lang="ts">

import levelsData from '@/data/games.json'

const route = useRoute();
const levelNumber = parseInt(route.params.levelNumber as string, 10); // Captura el gameId
const gameNumber = parseInt(route.params.gameNumber as string, 10); // Captura el gameId

// Encuentra el juego correspondiente
const gameData = levelsData.flatMap(level => level.games).find(game => game.id === gameNumber);


//encontramos el nivel correspondiente


</script>

<template>
 <ion-content>
    <div class="background-container w-full h-full relative">
      <ion-header>
        <ion-toolbar>
          <ion-title>Nivel {{ levelNumber }} - Juego {{ gameNumber }}</ion-title>
        </ion-toolbar>
      </ion-header>

    </div>
  </ion-content>
</template>

<style scoped>

</style>