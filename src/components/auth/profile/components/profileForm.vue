<script setup lang="ts">
import logo from '@/assets/SVG/aprendamos.svg';
import girl from '@/assets/PNG/niña 1.png';
import boy from '@/assets/SVG/niño 1.svg';
import palms from '@/assets/SVG/palmas.svg'
import { IUser } from '@/models/interfaces';
import { alertController } from '@ionic/vue';
import updateProfile from '@/components/auth/profile/actions/updateProfile';
import profileStore from '@/components/auth/profile/profile.store';
import userProgressStore from '@/components/userProgress/userProgress.store';

const emits = defineEmits(['updateProfile']);
const modelUser = ref<IUser>({} as IUser);
const isLoadingButton = ref(false);
const router = useRouter();

const isValidForm = computed(() => {
  return (
    modelUser.value.name &&
    modelUser.value.age &&
    modelUser.value.gender
  );
});


const saveProfile = async () => {
  if (!isValidForm.value) {
    alertController
      .create({
        header: 'Advertencia',
        message: 'Por favor, ingresa todos los campos',
        buttons: ['Aceptar'],
      })
      .then((alert) => alert.present());

    return;
  }

  isLoadingButton.value = true;
  await updateProfile(modelUser.value);
  isLoadingButton.value = false;
  emits('updateProfile');
};

const setInitialUserData = async () => {
  const user = profileStore.getUser();
  if (!user) return;

  modelUser.value = {
    uid: user.uid,
    name: user.name,
    age: user.age,
    gender: user.gender,
    progress: userProgressStore.getProgress(),
    updated_at: new Date(),
  };
};

const cancel = () => {
  router.push({name: 'Home'});
};

onMounted(async () => {
  await setInitialUserData();
});

</script>

<template>
  <ion-content>
    <div class="bg-[#FBFFD9] w-full h-full flex flex-col">
      <ion-img :src="logo" alt="image" class="w-1/2 mx-auto" />
      <ion-img :src="modelUser.gender == 'Niño' ? boy : girl " class="w-1/2 mx-auto" alt="image" />
      <div class="w-full mx-auto">
        <form>
          <ion-item lines="full" color="none">

            <ion-input
              v-model="modelUser.name"
              class="ml-2 text-[30px]"
              label="Nombre:"
              placeholder="Ingrese sus nombre"
            ></ion-input>
          </ion-item>

          <ion-item lines="full" color="none">
            <ion-input
              v-model="modelUser.gender"
              class="ml-2 text-[30px]"
              label="Genero:"
            ></ion-input>
          </ion-item>

          <ion-item lines="full" color="none">
            <ion-input
              v-model="modelUser.age"
              class="ml-2 text-[30px]"
              label="Edad:"
              placeholder="Ingrese su edad"
            ></ion-input>
          </ion-item>

          <ion-img :src="palms" alt="image" class="w-[100px] mx-auto"/>

          <div class="w-full flex justify-around p-4">
            <ion-button
              fill="clear"
              expand="block"
              size="large"
              class="bg-[#C9F6F5] rounded-sm text-black"
              @click="cancel"
            >
              Atras
            </ion-button>
            <ion-button
              :disabled="!isValidForm || isLoadingButton"
              expand="block"
              fill="clear"
              class="bg-[#C9F6F5] rounded-sm text-black"
              size="large"
              @click="saveProfile"
            >
              <ion-spinner v-if="isLoadingButton" name="lines"></ion-spinner>
              <p v-else class="normal-case">Guardar</p>
            </ion-button>
          </div>
        </form>
      </div>
    </div>
  </ion-content>
</template>

<style scoped>

</style>