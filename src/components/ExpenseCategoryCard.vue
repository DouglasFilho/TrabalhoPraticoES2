<template>
  <q-card class="q-pa-md category-card" :style="cardStyle">
    <q-card-section>
      <div class="text-h6 row items-center">
        <q-icon name="label" size="20px" class="q-mr-sm" /> {{ categoryName }}
      </div>

      <div class="row items-center text-subtitle1 q-mt-md">
        <q-icon name="attach_money" size="20px" class="q-mr-sm" />
        <span data-cy="expense-card-total">
          Total: <strong>R$ {{ totalAmount.toFixed(2) }}</strong>
        </span>
        <q-tooltip>
          Valor total gasto na categoria "{{ categoryName }}"
        </q-tooltip>
      </div>

      <div class="row items-center text-subtitle2 q-mt-sm">
        <q-icon name="list_alt" size="20px" class="q-mr-sm" />
        Despesas cadastradas: <strong>{{ expenseCount }}</strong>
        <q-tooltip>
          Número de despesas registradas na categoria "{{ categoryName }}"
        </q-tooltip>
      </div>

      <div v-if="percentageOfTotal" class="row items-center text-caption q-mt-sm">
        <q-icon name="percent" size="18px" class="q-mr-sm" />
        <span data-cy="expense-card-percentage">
          Porcentagem do total: <strong>{{ percentageOfTotal.toFixed(2) }}%</strong>
        </span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script setup lang="ts">
import { defineProps, computed } from "vue";
import { QIcon, QBtn, QTooltip } from "quasar";

const props = defineProps({
  categoryName: {
    type: String,
    required: true,
  },
  totalAmount: {
    type: Number,
    required: true,
  },
  expenseCount: {
    type: Number,
    required: true,
  },
  totalExpenses: {
    type: Number,
    required: false,
    default: null,
  },
});

const percentageOfTotal = computed(() =>
  props.totalExpenses ? (props.totalAmount / props.totalExpenses) * 100 : null
);

const cardStyle = computed(() => ({
  background: generateBlueGradient(),
  color: "#fff",
}));

function generateBlueGradient() {
  const blueShades = [
    "#1E3A8A", // Azul escuro sóbrio
    "#2563EB", // Azul médio vibrante
    "#3B82F6", // Azul claro
    "#60A5FA", // Azul suave
    "#93C5FD", // Azul pastel
  ];

  const color1 = blueShades[Math.floor(Math.random() * blueShades.length)];
  let color2;
  do {
    color2 = blueShades[Math.floor(Math.random() * blueShades.length)];
  } while (color1 === color2);

  return `linear-gradient(135deg, ${color1}, ${color2})`;
}
</script>

<style scoped>
.category-card {
  width: 300px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  overflow: hidden;
}

.category-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
}

.text-h6 {
  font-weight: bold;
  text-transform: uppercase;
}

.text-subtitle1,
.text-subtitle2 {
  color: rgba(255, 255, 255, 0.9);
}

.text-caption {
  font-size: 0.9em;
  color: rgba(255, 255, 255, 0.8);
}
</style>