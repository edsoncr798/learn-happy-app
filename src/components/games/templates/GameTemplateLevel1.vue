<script setup lang="ts">
import { IGame } from '@/models/interfaces';
import pencil from '@/assets/SVG/paint-brush-art-symbol-free-vector-removebg-preview 1.svg';
import profileStore from '@/components/auth/profile/profile.store';
import {
  completeGame,
  loadGame,
  updateGameState,
} from '@/components/games/actions/progressActions';


const router = useRouter();
const route = useRoute();
const userId = computed(() => profileStore.getUser().uid);
const user = ref();
const levelId = route.params.levelId as string;
const gameId = route.params.gameId as string;
const game = ref<IGame | null>(null);
const currentGame = ref({ levelId: levelId, gameId: gameId }); //juego actual

onMounted(async () => {
  const gameData = localStorage.getItem('selectedGame'); // Recuperar datos del juego
  if (gameData) {
    game.value = JSON.parse(gameData); // Convertir el string a objeto
  } else {
    console.error('No se encontraron datos del juego en LocalStorage');
  }

  //cargamos el progreso del usuario
  user.value = profileStore.getUser();

  //cargamos el estado del juego
  const isPainted = await loadGame(
    userId.value,
    currentGame.value.levelId,
    currentGame.value.gameId,
  );

  if (isPainted) {
    const targetElement = document.getElementById('colorable-image');
    const targetColor = game.value?.colors[0] ?? 'transparent';
    if (targetElement) {
      targetElement.style.backgroundColor = targetColor;
    }
  }

});

const exit = async () => {
  await router.push({
    name: 'LevelsGames',
  });
};


const handleDragStart = (event: DragEvent, color: string) => {
  event.dataTransfer?.setData('text/plain', color); // Guarda el color que se arrastra
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  const draggedColor = event.dataTransfer?.getData('text/plain'); // Obtiene el color
  const targetColor = game.value?.colors[0]; // Color correcto desde el juego
  if (!targetColor) return;

  if (draggedColor === targetColor) {
    //pinta el color correcto
    const targetElement = event.target as HTMLElement;
    targetElement.style.backgroundColor = targetColor;

    // Actualizar progreso y desbloquear el siguiente juego
    const successProgress = await completeGame(
      user.value,
      currentGame.value.levelId,
      currentGame.value.gameId,
    );

    if (successProgress) {
      const nextGameId = await updateGameState(
        currentGame.value.levelId,
        currentGame.value.gameId,
      );

      if (nextGameId) {
        alert('¡Nivel completado y siguiente juego desbloqueado!');
        currentGame.value.gameId = nextGameId;// Avanzar al siguiente juego usando su UID
      } else {
        alert('¡Nivel completado! No hay más juegos en este nivel.');
      }
    }
  } else {
    alert('¡Color incorrecto! Inténtalo de nuevo.');
  }
};

</script>

<template>
  <ion-content>
    <div class="w-full  text-center h-full relative">
      <ion-header class="text-left bg-[#16BC00] p-2 text-[20px]">
        ¡Empecemos! 00,0 seg
      </ion-header>
      <span class="absolute text-[30px] left-0 font-black font-mono">{{ game?.description }}</span>
      <div
        class="w-full h-[calc(100vh-204px)] flex justify-center items-center bg-white px-4"

      >
        <ion-img
          id="colorable-image"
          v-for="(img, i) in game?.images"
          :key="i"
          :src="img"
          @dragover.prevent
          @drop="handleDrop"
          class="w-3/4 border-green-500 border-none"
          alt="dibujo" />
      </div>

      <div
        class="w-full bg-gray-100 py-4 border-2 flex items-center justify-around border-gray-500 absolute bottom-0 mb-14">
        <ion-img :src="pencil" class="w-[90px]" alt="pencil" />
        <ion-button
          fill="clear"
          v-for="(color, i) in game?.colors"
          :key="i"
          class="w-[90px] h-[90px] rounded-[50%]"
          :style="{
        backgroundColor: color}"
          :draggable="game?.completed ? 'false' : 'true'"
          @dragstart="handleDragStart($event, color)"
        >
        </ion-button>
      </div>
      <ion-button @click="exit" fill="clear" class="absolute rounded-sm bottom-0 mb-2 right-0 mr-5 bg-[#C9F6F5]">Salir
      </ion-button>
    </div>
  </ion-content>
</template>

<style scoped>

</style>