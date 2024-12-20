<script setup lang="ts">
import NumberGamesLevelApp from '@/components/numberGamesLevel/numberGamesLevelApp.vue';
import getGames from '@/components/games/actions/getGames';
import { onIonViewWillEnter } from '@ionic/vue';

const route = useRoute();
const isLoading = ref(false);

onIonViewWillEnter(async () => {
  const levelId = route.params.levelId as string;
  await getGames(levelId);
  isLoading.value = true;
});
</script>

<template>
  <ion-page>
    <number-games-level-app v-if="isLoading" />
  </ion-page>
</template>

<style scoped></style>
