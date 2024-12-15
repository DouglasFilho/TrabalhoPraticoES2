<template>
  <Pie
    class="q-pa-lg"
    id="my-chart-id"
    :options="options"
    :data="chartData"
  />
</template>

<script setup lang="ts">
import { Chart as ChartJS, ArcElement, Tooltip, Legend, type ChartOptions } from 'chart.js'
import { Pie } from 'vue-chartjs'
import { useExpensesStore } from '@/stores/expenses';
import { computed } from 'vue';

ChartJS.register(ArcElement, Tooltip, Legend);

const expensesStore = useExpensesStore();

const chartData = computed(() => {
  const categories = expensesStore.existingCategoriesWithTotals;

  return {
    labels: categories.map((el) => el.category),
    datasets: [
      {
        backgroundColor: generateColorArray(categories.length),
        data: categories.map((el) => el.total),
      },
    ],
  };
});

const options: ChartOptions<'pie'> = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: 'right',
    },
  },
};

// Função para gerar cores baseadas em tons de azul
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
    const randomColor = blueShades[Math.floor(Math.random() * blueShades.length)];
    colors.push(randomColor);
  }

  return colors;
}
</script>
