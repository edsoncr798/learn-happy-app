<script setup lang="ts">
import { IonApp, IonRouterOutlet } from '@ionic/vue';
import profileStore, { IUser } from '@/components/auth/profile/profile.store';

onMounted(async () => {
  const user = localStorage.getItem('user');
  profileStore.setUser(user ? JSON.parse(user) : {} as IUser);
});

</script>

<template>
  <ion-app>
    <ion-router-outlet id="main-content" />
  </ion-app>
</template>

