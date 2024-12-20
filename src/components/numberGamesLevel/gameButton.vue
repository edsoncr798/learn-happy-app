<script setup lang="ts">
import { IGame } from '@/models/interfaces';

defineProps({
  game: Object as PropType<IGame>,
  index: Number,
});
</script>

<template>
  <ion-button
    v-if="game"
    fill="clear"
    :key="game.uid"
    :class="[
      `game-${game.gameNumber}`,
      (game.unlocked && game.completed) || game.completed
        ? 'bg-completed'
        : game.unlocked
          ? 'bg-unlocked'
          : 'bg-locked',
    ]"
    class="bg-[#FF0000FF] w-[90px] h-[90px] rounded-[50%] text-[30px] text-white font-black"
    @click="$emit('goToGame', game)"
  >
    {{ game.gameNumber }}
  </ion-button>
</template>

<style scoped></style>
