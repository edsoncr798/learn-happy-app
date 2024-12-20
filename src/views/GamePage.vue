<script setup lang="ts">

import profileStore from '@/components/auth/profile/profile.store';

const levelNumber = computed(() => profileStore.getUserProgressLevels().length)

</script>

<template>
  <ion-page>
    <game-template-level1 v-if="levelNumber <= 3" />
    <game-template-level2 v-else/>
  </ion-page>
</template>

<style scoped>

</style>