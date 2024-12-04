<script setup lang="ts">

const route = useRoute();



</script>

<template>
  <ion-page>
    <game-view :level-number="route.params.levelNumber" />
  </ion-page>
</template>

<style scoped>

</style>