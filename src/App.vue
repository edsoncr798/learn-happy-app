<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';

// onMounted(async () => {
//   await useInitialData().getInitialData();
//   isMounted.value = true;
// });

</script>

<template>
  <ion-app>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

