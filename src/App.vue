<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import profileStore from '@/components/auth/profile/profile.store';
import { IUser } from '@/models/interfaces';
import { loadProgress } from '@/components/games/actions/progressActions';

const isMounted = ref(false);

onMounted(async () => {
  const userData = localStorage.getItem('user');
  const user = userData ? JSON.parse(userData) : {} as IUser;
  profileStore.setUser(user);
  await loadProgress(user.uid);
  isMounted.value = true;
});

</script>

<template>
  <ion-app>
    <ion-router-outlet id="main-content" v-if="isMounted"/>
  </ion-app>
</template>

