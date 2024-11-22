<script setup lang="ts">
import logoApp from '@/assets/SVG/aprendamos.svg';
import child from '@/assets/SVG/niño 1.svg';
import profileStore, { IUser } from '@/components/auth/profile/profile.store';
import genderMan from '@/assets/SVG/gender-man.svg';
import genderWoman from '@/assets/SVG/gender-woman.svg';
import registerUser from '@/components/auth/actions/registerUser';
import { toastController } from '@ionic/vue';

const uid = computed(() => profileStore.getUser()?.uid);
const router = useRouter()

const initialData = ref({
  uid: uid.value,
  name: '',
  age: '',
  gender: '',
} as IUser);

const isValidForm = () => {
  return (
    initialData.value.name &&
    initialData.value.age &&
    initialData.value.gender
  )
};

const selectGender = (gender: string) => {
  initialData.value.gender = gender;
  console.log(initialData.value.gender);
};

const saveInitialData = async () => {

  if (!isValidForm()){
    toastController
      .create({
        message:'debe llenar los campos',
        duration: 1000,
        color: 'info',
        position: 'top',
      })
      .then((toast) => toast.present());
  }

  await registerUser(initialData.value);

  await router.push('./home')
};

</script>

<template>
  <ion-content>

    <div class="w-full h-full bg-[#FBFFD9]">
      <div class="flex flex-col mb-10 items-center">
        <ion-img :src="logoApp" class="w-[150px]"></ion-img>
        <ion-img :src="child"></ion-img>
      </div>
      <div>
        <form @submit.prevent="saveInitialData()">
          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center">
              <ion-label style="font-size: 30px">Nombre</ion-label>
              <ion-input
                v-model="initialData.name"
                type="text"
                class="border-2 border-black bg-white"
                required
                placeholder="Tu Nombre"
              />
            </div>
          </ion-item>
          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center">
              <ion-label style="font-size: 30px">Edad</ion-label>
              <ion-input
                v-model="initialData.age"
                type="number"
                class="border-2 border-black bg-white"
                required placeholder="Tu Edad"
              />
            </div>
          </ion-item>

          <ion-item lines="none" color="none">
            <div class="w-full flex flex-col items-center">
              <ion-label style="font-size: 30px">Género</ion-label>
              <div class="w-full flex gap-4 justify-center">
                <ion-button
                  size="large"
                  expand="full"
                  fill="default"
                  class="border-2 border-black"
                  @click="selectGender('Niño')"
                >
                  <ion-icon size="large" :src="genderMan"></ion-icon>
                  Niño
                </ion-button>
                <ion-button
                  size="large"
                  expand="full"
                  fill="default"
                  class="border-2 border-black"
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
            color="primary"
            class="px-4"
            @click="saveInitialData"
          >
            Iniciar
          </ion-button>
        </form>
      </div>
    </div>

  </ion-content>
</template>

<style scoped>

</style>