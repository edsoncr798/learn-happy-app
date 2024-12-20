<script setup lang="ts">
import logoApp from '@/assets/SVG/aprendamos.svg';
import child from '@/assets/SVG/niño 1.svg';
import genderMan from '@/assets/SVG/gender-man.svg';
import genderWoman from '@/assets/SVG/gender-woman.svg';
import registerUser from '@/components/auth/actions/registerUser';
import { toastController } from '@ionic/vue';
import { IUser } from '@/models/interfaces';

const router = useRouter();
const isLoadingButton = ref(false);

const initialData = ref({
  name: '',
  age: 0,
  gender: '',
} as IUser);

const selectGender = (gender: string) => {
  initialData.value.gender = gender;
  console.log(initialData.value.gender);
};

const isValidForm = () => {
  return (
    initialData.value.name &&
    initialData.value.age &&
    initialData.value.gender
  )
};


const saveInitialData = async () => {
  if (!isValidForm()) {
    toastController
      .create({
        message: 'Por favor, rellenar los campos correctamente',
        color: 'warning',
        duration: 1000,
        position: 'top',
      })
      .then((toast) => toast.present());
    return;
  }
  isLoadingButton.value = true;
  await registerUser(initialData.value);
  isLoadingButton.value = false;
  await router.push({ name: 'Home' });
};

</script>

<template>
  <ion-content>
    <div class="w-full h-full bg-[#FBFFD9]">
      <div class="flex flex-col mb-5 items-center">
        <ion-img :src="logoApp" class="w-[200px]"></ion-img>
        <ion-img :src="child" class="bg-[#FBFFD9]"></ion-img>
      </div>
      <div class="bg-[#FBFFD9]">
        <form @submit.prevent="saveInitialData" >
          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center px-5">
              <ion-label style="font-size: 30px">Nombre</ion-label>
              <ion-input
                v-model="initialData.name"
                type="text"
                class="border-2 text-center text-3xl border-[#1461eb] bg-white"
                placeholder="Tu Nombre"
              />
            </div>
          </ion-item>
          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center px-5">
              <ion-label style="font-size: 30px">Edad</ion-label>
              <ion-input
                v-model="initialData.age"
                type="number"
                class="border-2 text-3xl border-[#1461eb]  bg-white text-center"
                placeholder="Tu Edad"
              />
            </div>
          </ion-item>

          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center px-5">
              <ion-label style="font-size: 30px">Género</ion-label>
              <div class="w-full flex justify-between">
                <ion-button
                  size="large"
                  expand="full"
                  fill="default"
                  class="border-2 border-[#1461eb]"
                  @click="selectGender('Niño')"
                >
                  <ion-icon size="large" :src="genderMan"></ion-icon>
                  Niño
                </ion-button>
                <ion-button
                  size="large"
                  expand="full"
                  fill="default"
                  class="border-2 border-[#1461eb]"
                  @click="selectGender('Niña')"
                >
                  <ion-icon size="large" :src="genderWoman"></ion-icon>
                  Niña
                </ion-button>
              </div>
            </div>
          </ion-item>

          <ion-button
            size="large"
            shape="round"
            expand="block"
            class="px-4 font-mono font-black text-2xl"
            type="submit"
          >
            <ion-spinner v-if="isLoadingButton" name="lines"></ion-spinner>
            Iniciar
          </ion-button>
        </form>
      </div>
    </div>
  </ion-content>
</template>

<style scoped>
.selected{
  background-color: darkblue;
}

</style>