<template>
  <q-card class="expense-table">
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

    <q-table
      :rows="paginatedExpenses"
      :columns="columns"
      row-key="id"
      flat
      bordered
      hide-bottom
    />

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

const pagination = ref({
  page: 1,
  rowsPerPage: 3,
});

const paginatedExpenses = computed(() => {
  const start = (pagination.value.page - 1) * pagination.value.rowsPerPage;
  const end = start + pagination.value.rowsPerPage;
  return filteredExpenses.value.slice(start, end);
});

const columns: {
  name: string;
  label: string;
  field: string | ((row: any) => any);
  align?: "left" | "right" | "center";
  sortable?: boolean;
  format?: (val: any) => string;
}[] = [
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
