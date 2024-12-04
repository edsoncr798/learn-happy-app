<script setup lang="ts">
import profileStore from '@/components/auth/profile/profile.store';
import { toastController } from '@ionic/vue';
// import levelsData from '@/data/games.json'

const router = useRouter();
const route = useRoute();

const levelNumber = computed(() => parseInt(route.params.levelNumber as string, 10));
const userName = computed(() => profileStore.getUserName());

//datos dinamicos del Json


// Niveles totales
const totalLevels = 15;


// Nivel actual (representa el nivel alcanzado por el jugador)
const currentLevel = ref(1);

// Calcular el grupo de niveles visibles (de 5 en 5)
const currentGroupStart = computed(() => Math.floor((currentLevel.value - 1) / 5) * 5 + 1);
const visibleLevels = computed(() => {
  const start = currentGroupStart.value;
  const end = Math.min(start + 4, totalLevels); // Asegurar que no pase del total
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
});

const goToGame = () => {
  // if (gameId <= currentLevel.value) {
  //   router.push({
  //     name: 'Game',
  //     params: { levelNumber: levelNumber.value, gameId },
  //   });
  //   console.log('hola');
  // }
  toastController
    .create({
      message: `hola ${userName.value}, en estos momentos trabajamos en la vista de los juegos`,
      color: 'secondary',
      duration: 2000,
      position: 'middle',
    })
    .then((toast) => toast.present());
};


const goToBack = () => {
  router.push({ name: 'game-levels' });
};

</script>

<template>
  <ion-content>
    <div class="background-levels w-full h-full relative">
      <ion-card color="success" class="font-mono font-black w-[60%] absolute top-0 left-0 p-2 text-xl">Nivel:
        {{ levelNumber }} <br> Jugador: {{ userName }}
      </ion-card>
      <div class="btn-games-container">
        <ion-button
          fill="clear"
          v-for="level in visibleLevels" :key="level"
          :style="{
        backgroundColor: level > currentLevel ? 'gray' : 'red'
      }"
          :class="`game-${level}`"
          class="bg-[#FF0000FF] w-[90px] h-[90px] rounded-[50%] text-[30px] text-white font-black"
          @click="goToGame(level)"
        >
          {{ level }}
        </ion-button>

      </div>
    </div>
    <ion-button
      fill="clear"
      class="bg-[#C9F6F5] rounded-sm absolute bottom-0 mb-2 right-0 mr-5"
      @click="goToBack"
    >
      Regresar
    </ion-button>
  </ion-content>
</template>

<style scoped>
.background-levels {
  background-image: url("@/assets/SVG/walkingLevels.svg");
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
}

.btn-games-container {
  display: grid;
  justify-items: center;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(5, 1fr);
  width: 100%;
  height: 100%;
}

.levels-container {
  max-height: 400px;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth; /* Transiciones suaves al hacer scroll */
}


.game-1 {
  align-self: end;
  margin-left: -35px;
  grid-row: 5;
  grid-column: 2;
}

.game-2 {
  align-self: start;
  margin-right: -25px;
  grid-row: 5;
  grid-column: 1;
}

.game-3 {
  align-self: end;
  margin-bottom: -35px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}

.game-4 {
  align-self: end;
  margin-left: -55px;
  grid-row: 4;
  grid-column: 3;
}

.game-5 {
  align-self: start;
  margin-top: -20px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}

.game-6 {
  align-self: end;
  margin-left: -35px;
  grid-row: 5;
  grid-column: 2;
}

.game-7 {
  align-self: start;
  margin-right: -25px;
  grid-row: 5;
  grid-column: 1;
}

.game-8 {
  align-self: end;
  margin-bottom: -35px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}

.game-9 {
  align-self: end;
  margin-left: -55px;
  grid-row: 4;
  grid-column: 3;
}

.game-10 {
  align-self: start;
  margin-top: -20px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}

.game-11 {
  align-self: end;
  margin-left: -35px;
  grid-row: 5;
  grid-column: 2;
}

.game-12 {
  align-self: start;
  margin-right: -25px;
  grid-row: 5;
  grid-column: 1;
}

.game-13 {
  align-self: end;
  margin-bottom: -35px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}

.game-14 {
  align-self: end;
  margin-left: -55px;
  grid-row: 4;
  grid-column: 3;
}

.game-15 {
  align-self: start;
  margin-top: -20px;
  margin-left: -15px;
  grid-row: 4;
  grid-column: 2;
}


</style>