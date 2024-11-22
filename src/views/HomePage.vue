<script setup lang="ts">
import img_learning from '@/assets/SVG/aprendamos.svg';
import img_palmas from '@/assets/SVG/palmas.svg';
import number_img from '@/assets/SVG/1 2 3 4 5.svg';
import vocales_img from '@/assets/SVG/a e i o u.svg';
import ellipse1 from '@/assets/SVG/Ellipse 1.svg';
import ellipse2 from '@/assets/SVG/Ellipse 2.svg';
import ellipse3 from '@/assets/SVG/Ellipse 3.svg';
import ellipse4 from '@/assets/SVG/Ellipse 4.svg';
import polygon_img from '@/assets/SVG/Polygon 1.svg';
import rectangle_img from '@/assets/SVG/Rectangle 5.svg';


</script>

<template>
  <ion-page>
    <ion-content>
      <ion-img :src='img_learning' class="w-3/4 px-4 mx-auto" />
      <div class="grid grid-cols-2 w-full grid-flow-row relative">

        <ion-card class="text-center bg-[#C9F6F5]">
          <ion-card-header>
            <ion-card-title class="font-black text-[30px] font-[Aclonica] leading-[27.2px]">Números</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-img :src='number_img' />
          </ion-card-content>
        </ion-card>

        <ion-card class="text-center bg-[#C9F6F5]">
          <ion-card-header>
            <ion-card-title class="font-black text-[30px] font-[Aclonica] leading-[27.2px]">Vocales</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <ion-img :src='vocales_img' />
          </ion-card-content>
        </ion-card>

        <ion-img :src='img_palmas'
                 class="left-[50%] -translate-x-1/2 absolute z-10 -translate-y-1/2 top-1/2 px-4 mx-auto" />

        <ion-card class="text-center bg-[#C9F6F5]">
          <ion-card-header>
            <ion-card-title class="font-black text-[30px] font-[Aclonica] leading-[27.2px]">Colores</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="flex-wrap-reverse justify-center gap-2 flex">
              <ion-img :src='ellipse2' class="w-[50px]" />
              <ion-img :src='ellipse3' class="w-[50px] " />
              <ion-img :src='ellipse4' class="w-[50px] " />
            </div>
          </ion-card-content>
        </ion-card>

        <ion-card class="text-center bg-[#C9F6F5]">
          <ion-card-header>
            <ion-card-title class="font-black text-[30px] font-[Aclonica] leading-[27.2px]">Figuras</ion-card-title>
          </ion-card-header>
          <ion-card-content>
            <div class="flex flex-wrap-reverse justify-center gap-2">
              <ion-img :src='ellipse1' class="w-[50px] " />
              <ion-img :src='rectangle_img' class="w-[50px] " />
              <ion-img :src='polygon_img' class="w-[50px] " />
            </div>
          </ion-card-content>
        </ion-card>
      </div>

    </ion-content>
  </ion-page>
</template>

<style scoped>
ion-card-header {
  padding: 20px 0 20px 0;
}
</style>
