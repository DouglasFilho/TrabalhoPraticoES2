<template>
  <q-card class="expense-table">
    <!-- Filtros -->
    <q-card-section class="q-pb-sm">
      <div class="expense-table__filter row">
        <q-input
          filled
          v-model="search"
          label="Buscar por nome"
          type="text"
          debounce="300"
          class="q-mr-sm col-4"
          dense
        />
        <q-select
          filled
          v-model="selectedCategory"
          :options="categoryOptions"
          label="Filtrar por categoria"
          emit-value
          map-options
          clearable
          class="col-4"
          dense
        />
      </div>
    </q-card-section>

    <!-- Tabela com paginação -->
    <q-table
      :rows="paginatedExpenses"
      :columns="columns"
      row-key="id"
      flat
      bordered
      hide-bottom
    />

    <!-- Paginação -->
    <q-card-actions align="center">
      <q-pagination
        v-model="pagination.page"
        :max="Math.ceil(filteredExpenses.length / pagination.rowsPerPage)"
        color="primary"
        size="sm"
        dense
      />
    </q-card-actions>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import { defineProps } from "vue";
import type { Expense } from "@/interfaces/Expense";

const props = defineProps({
  expenses: {
    type: Array as () => Expense[],
    required: true,
  },
});

// Filtros
const search = ref("");
const selectedCategory = ref<string | null>(null);

const categoryOptions = computed(() =>
  Array.from(new Set(props.expenses.map((expense) => expense.category)))
);

const filteredExpenses = computed(() => {
  return props.expenses.filter((expense) => {
    const matchesSearch = expense.name
      .toLowerCase()
      .includes(search.value.toLowerCase());
    const matchesCategory =
      !selectedCategory.value || expense.category === selectedCategory.value;
    return matchesSearch && matchesCategory;
  });
});

// Configuração de paginação
const pagination = ref({
  page: 1,
  rowsPerPage: 3, // Máximo de linhas por página
});

const paginatedExpenses = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return filteredExpenses.value.slice(start, end);
});

// Colunas da tabela
const columns = [
  {
    name: "name",
    label: "Nome",
    align: "left",
    field: "name",
    sortable: true,
  },
  {
    name: "category",
    label: "Categoria",
    align: "left",
    field: "category",
    sortable: true,
  },
  {
    name: "amount",
    label: "Valor",
    align: "right",
    field: "amount",
    format: (val: number) => `R$ ${val.toFixed(2)}`,
  },
];
</script>

<style scoped lang="scss">
.expense-table {
  width: 65vw;
  height: 40vh;

  &__filter {
    display: flex;
  }
}
</style>
