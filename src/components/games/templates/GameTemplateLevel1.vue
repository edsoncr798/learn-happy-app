<script setup lang="ts">
import { IGame } from '@/models/interfaces';
import pencil from '@/assets/SVG/paint-brush-art-symbol-free-vector-removebg-preview 1.svg';
import profileStore from '@/components/auth/profile/profile.store';
import {
  loadProgress,
  saveProgress,
} from '@/components/games/actions/progressActions';
import gamesStore from '@/components/games/games.store';
import gameLevelsStore from '@/components/gameLevels/gameLevels.store';

const router = useRouter();
const route = useRoute();
const showModal1 = ref(false);
const showModal2 = ref(false);

const message = ref('');
const userId = computed(() => profileStore.getUser().uid);
const user = ref();
const levelId = route.params.levelId as string;
const gameId = route.params.gameId as string;
const game = ref<IGame | null>(null);
const currentGame = ref({ levelId: levelId, gameId: gameId }); //juego actual

//git de niños felices
// https://i.pinimg.com/originals/55/fb/44/55fb44dcbbec789f6edad27a058e1e55.gif

onMounted(async () => {
  //cargamos el progreso del usuario
  user.value = profileStore.getUser();
  const progress = await loadProgress(userId.value);

  //restauramos el estado de los juegos desbloqueados
  const isUnlocked =
    progress?.[currentGame.value.levelId]?.[currentGame.value.gameId]
      ?.completed;

  if (isUnlocked) {
    message.value = '¡Juego ya completado!';
  } else {
    const gameData = localStorage.getItem('games'); // Recuperar datos del juego
    if (gameData) {
      game.value = JSON.parse(gameData); // Convertir el string a objeto
    } else {
      console.error('No se encontraron datos del juego en LocalStorage');
    }
  }
});

//funcion para completar el juego
const completeGame = async (gameId: string, levelId: string) => {
  gamesStore.updateGames(gameId, { completed: true });

  // Verificar si es el último juego del nivel
  const isLastGame = gamesStore.getGames().every((game) => game.completed);
  console.log(isLastGame);

  // Guardar progreso en Firebase y LocalStorage
  await saveProgress(
    userId.value,
    currentGame.value.levelId,
    currentGame.value.gameId,
    isLastGame,
  );

  if (isLastGame) {
    const levels = gameLevelsStore.getLevels();
    const currentLevel = levels.find((level) => level.uid === levelId);
    if (!currentLevel) return;
    const nextLevel = levels.find(
      (level) => level.levelNumber === currentLevel?.levelNumber + 1,
    );
    if (!nextLevel) return;
    gameLevelsStore.unlockedNextLevel(nextLevel?.uid);
    message.value =
      '¡Has completado el nivel! Se ha desbloqueado el siguiente nivel.';
  } else {
    gamesStore.unlockNextGame();
    message.value = '¡Buen trabajo! Se ha desbloqueado el siguiente juego.';
  }
  // localStorage.setItem('games', JSON.stringify(game));
  setTimeout(() => {
    showModal1.value = true;
  }, 500);
};

const exit = async () => {
  await router.push({
    name: 'LevelsGames',
  });
};

const handleDragStart = (event: DragEvent, color: string) => {
  event.dataTransfer?.setData('text/plain', color);
};

const handleDrop = async (event: DragEvent) => {
  event.preventDefault();
  const draggedColor = event.dataTransfer?.getData('text/plain');
  const targetColor = game.value?.colors[0]; //color correcto desde el juego
  if (!targetColor) return;

  if (draggedColor === targetColor) {
    const targetElement = event.target as HTMLElement;
    targetElement.style.backgroundColor = targetColor;

    //Completar el juego y guardar el progreso
    await completeGame(currentGame.value.gameId, currentGame.value.levelId);
  } else {
    message.value = 'No te preocupes puedes volver a intentarlo';
    showModal2.value = true;
  }
};

const goToNextLevel = async () => {
  showModal1.value = false; // Cierra el modal
  await router.push({
    name: 'LevelsGames', // Regresa a la vista de los niveles o juegos
  });
};

const tryAgain = async () => {
  showModal2.value = false;
};
</script>

<template>
  <ion-content>
    <congratulations-modal
      :is-open="showModal1"
      :message="message"
      @close="() => (showModal1 = false)"
      @goToNextLevel="goToNextLevel"
    />
    <failed-modal
      :is-open="showModal2"
      :message="message"
      @close="() => (showModal2 = false)"
      @tryAgain="tryAgain"
    />
    <div class="w-full text-center h-full relative">
      <ion-header class="text-left bg-[#16BC00] p-2 text-[20px]">
        ¡Empecemos!
      </ion-header>
      <span class="absolute text-[30px] left-0 font-black font-mono">{{
        game?.description
      }}</span>
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
          alt="dibujo"
        />
      </div>

      <div
        class="w-full bg-gray-100 py-4 border-2 flex items-center justify-around border-gray-500 absolute bottom-0 mb-14"
      >
        <ion-img :src="pencil" class="w-[90px]" alt="pencil" />
        <ion-button
          fill="clear"
          v-for="(color, i) in game?.colors"
          :key="i"
          class="w-[90px] h-[90px] rounded-[50%]"
          :style="{
            backgroundColor: color,
          }"
          :draggable="true"
          @dragstart="handleDragStart($event, color)"
        >
        </ion-button>
      </div>
      <ion-button
        @click="exit"
        fill="clear"
        class="absolute rounded-sm bottom-0 mb-2 right-0 mr-5 bg-[#C9F6F5]"
        >Salir
      </ion-button>
    </div>
  </ion-content>
</template>

<style scoped></style>
