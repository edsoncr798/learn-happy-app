<script setup lang="ts">
import GameLevelsSkeleton from '@/components/gameLevels/gameLevelsSkeleton.vue';
import getLevels from '@/components/gameLevels/actions/getLevels';
import { onIonViewWillEnter } from '@ionic/vue';

const isLoading = ref(false);

const requestData = async () => {
  isLoading.value = true;
  await getLevels();
  isLoading.value = false;
};

onIonViewWillEnter(() => {
  requestData();
});
</script>

<template>
  <ion-page>
    <game-levels-skeleton v-if="isLoading" />
    <games-levels-app v-else />
  </ion-page>
</template>

<style scoped></style>
