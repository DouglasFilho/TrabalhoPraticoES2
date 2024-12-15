<template>
  <Pie
    class="q-pa-lg"
    id="my-chart-id"
    :options="options"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { useExpensesStore } from '@/stores/expenses';
import { computed } from 'vue';

const expensesStore = useExpensesStore();
ChartJS.register(ArcElement, Tooltip, Legend)

const chartData = computed(() => {
  const categories = expensesStore.existingCategoriesWithTotals;

  return {
    labels: categories.map((el) => el.category),
    datasets: [
      {
        backgroundColor: generateColorArray(categories.length),
        data: categories.map((el) => el.total)
      }
    ]
  };
});

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
      align: 'center'
    }
  }
}

function generateColorArray(length: number): string[] {
  const blueShades = [
    "#1E3A8A", // Azul escuro sóbrio
    "#2563EB", // Azul médio vibrante
    "#3B82F6", // Azul claro
    "#60A5FA", // Azul suave
    "#93C5FD", // Azul pastel
  ];

  const colors: string[] = [];
  for (let i = 0; i < length; i++) {
    // Seleciona uma cor aleatória da paleta
    const randomColor = blueShades[Math.floor(Math.random() * blueShades.length)];
    colors.push(randomColor);
  }

  return colors;
}
</script>