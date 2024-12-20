<script setup lang="ts">
import ApexCharts from 'apexcharts';
import { loadProgress } from '@/components/games/actions/progressActions';
import profileStore from '@/components/auth/profile/profile.store';
import userProgressStore from '@/components/userProgress/userProgress.store';

const userId = computed(() => profileStore.getUser().uid);
const progressData = computed(() => userProgressStore.getProgress());
const isLoading = ref(false);


// Configuración de ApexCharts
const series = ref<{ data: number[] }[]>([]); // Serie de datos para ApexCharts
const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350,
  },
  plotOptions: {
    bar: {
      borderRadius: 4,
      borderRadiusApplication: 'end',
      horizontal: true,
    },
  },
  dataLabels: {
    enabled: false,
  },
  xaxis: {
    categories: [] as string[], // Categorías del eje X
    title: {
      text: 'Juegos',
    },
  },
  yaxis: {
    labels: {
      formatter: (val: number) => `Nivel ${val}`,
    },
  },
});

// Función para transformar los datos para ApexCharts
const updateChartData = () => {
  const progress = progressData.value;
  if (progress) {
    const categories = Object.keys(progress); // Los levelId como categorías
    const data = categories.map((levelId) => progress[levelId]?.completedGames || 0); // Valores de completedGames

    // Actualizar ApexCharts
    chartOptions.value.xaxis.categories = categories;
    series.value = [{ data }];
  }
};

// Monitorear cambios en el progreso
watch(progressData, () => {
  updateChartData();
});

onMounted(async () => {
  isLoading.value = true;
  const progress = await loadProgress(userId.value);
  userProgressStore.setProgress(progress);
  isLoading.value = false;
});

console.log('progreso del usurio: ', userId.value, ' Progresos:', progressData.value);

</script>

<template>
  <ion-page>
    <ion-content>
      <div class="background-container w-full h-full">
        <ion-title>Progreso del usuario</ion-title>

        <div id="chart">
          <apexchart type="bar" height="350" :options="chartOptions" :series="series"></apexchart>
        </div>
      </div>
    </ion-content>
  </ion-page>
</template>

<style scoped>

</style>