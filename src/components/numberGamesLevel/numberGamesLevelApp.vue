<script setup lang="ts">
import profileStore from '@/components/auth/profile/profile.store';
import { IGame } from '@/models/interfaces';
import getGames from '@/components/games/actions/getGames';
import gamesStore from '@/components/games/games.store';
import { toastController } from '@ionic/vue';
import GameButton from '@/components/numberGamesLevel/gameButton.vue';

const route = useRoute();
const router = useRouter();

const userName = computed(() => profileStore.getUserName());
const levelId = route.params.levelId as string;
const games = computed(() => {
  const games = gamesStore.getGames();
  const userGames = profileStore.getUserGamesCompletedByLevel2(levelId) || [];

  return games.map((game: IGame, index) => {
    game.completed =
      userGames.findIndex((userGame) => userGame === game.uid) !== -1;

    game.unlocked = game.completed;
    if (index > 0) {
      game.unlocked = games[index - 1].completed;
    }
    return game;
  });
});
const completedGames = ref<number>(0);

onMounted(async () => {
  completedGames.value = profileStore.getUserCompletedGamesByLevel(levelId);
  await getGames(levelId);
});

const goToGame = async (game: IGame) => {
  if (game.unlocked) {
    localStorage.setItem('games', JSON.stringify(game));
    await router.push({
      name: 'Games',
      params: { gameId: game.uid },
    });
  } else {
    toastController
      .create({
        message: 'juego bloqueado',
        duration: 2000,
        color: 'warning',
      })
      .then((toast) => toast.present());
  }
};

const goToBack = () => {
  router.push({ name: 'Levels' });
};
</script>

<template>
  <ion-content>
    <div class="background-levels w-full h-full relative">
      <ion-card
        color="success"
        class="font-mono font-black w-[60%] absolute top-0 left-0 p-2 text-xl"
      >
        Jugador: {{ userName }}
      </ion-card>
      <div class="btn-games-container">
        <game-button
          v-for="(game, index) in games"
          :key="game.uid"
          :game="game"
          :index="index"
          @goToGame="goToGame"
        />
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
  background-image: url('@/assets/SVG/walkingLevels.svg');
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

.bg-unlocked {
  background-color: red;
}

.bg-locked {
  background-color: gray;
}

.bg-completed {
  background-color: green;
}
</style>
