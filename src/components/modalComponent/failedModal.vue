<script setup lang="ts">
import sad from '@/assets/PNG/sad.png';

defineProps({
  isOpen: Boolean,
  message: String,
});

defineEmits(['close', 'tryAgain']);
</script>

<template>
  <ion-modal :is-open="isOpen" @onDidDismiss="$emit('close')">
    <ion-content>
      <div class="w-full h-full relative text-center">
        <ion-title class="text-[35px] font-mono font-black" color="success">¡Oh no fallaste!</ion-title>
        <p class="text-green-500 font-black">{{ message }}</p>
        <ion-img class="animate-bounce w-3/4 mt-20 mx-auto" :src="sad" alt="imagen" />
        <ion-button @click="$emit('tryAgain')" class="absolute right-0 bottom-0 mr-5 mb-5">Intentar</ion-button>
      </div>
    </ion-content>
  </ion-modal>
</template>

<style scoped>

ion-modal {
  --height: 70%;
  --backdrop-opacity: .9;
  --border-radius: 16px;
  --box-shadow: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);
}

ion-modal::part(backdrop) {
  background: rgb(57, 57, 66);
  opacity: 1;
}

ion-modal ion-toolbar {
  --background: rgb(14 116 144);
  --color: white;
}

</style>