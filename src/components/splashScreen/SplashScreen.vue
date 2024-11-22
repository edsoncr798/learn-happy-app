<script setup lang="ts">
import logoApp from '@/assets/SVG/aprendamos.svg'
import palms from '@/assets/SVG/palmas.svg'

const router = useRouter();

onMounted(() =>{
  setTimeout(() =>{
    router.push('/inial-data');
  }, 3000)
})

</script>

<template>
  <ion-content>
    <div class="relative w-full h-full bg-[#FBFFD9] flex justify-center ion-text-center">
      <ion-img
        class="animate-pulse w-[300px]"
        :src="logoApp"
      >
      </ion-img>
      <ion-img class="absolute bottom-0 mb-10" :src="palms"></ion-img>

    </div>
  </ion-content>
</template>

<style scoped>

</style>