<script setup lang="ts">

import AppHeader from '@/components/AppHeader.vue';
</script>

<template>
  <ion-page>
    <app-header />

    <ion-content>
      <ion-router-outlet  id="main-content"/>
    </ion-content>

  </ion-page>
</template>

<style scoped>

</style>