<template>
  <q-card bordered class="q-mx-lg q-pa-sm expense-controller">
    <q-form @submit.prevent="addExpense" ref="form">
      <q-input
        filled
        label="Nome"
        v-model="newExpense.name"
        type="text"
        :rules="[val => !!val || 'O nome é obrigatório', val => val.length <= 50 || 'Máximo de 50 caracteres']"
        lazy-rules
        data-cy="expense-name-input"
        data-testid="input-name"
      />
      <q-input
        filled
        label="Valor"
        v-model.number="newExpense.amount"
        type="number"
        :rules="[val => val > 0 || 'O valor deve ser maior que 0', val => val <= maxAmount || `Máximo permitido é R$ ${maxAmount}`]"
        lazy-rules
        data-cy="expense-amount-input"
        data-testid="input-amount"
      />
      <q-select
        filled
        label="Categoria"
        v-model="newExpense.category"
        :options="categoryOptions"
        use-input
        input-debounce="300"
        :rules="[val => !!val || 'A categoria é obrigatória']"
        @new-value="addNewCategory"
        lazy-rules
        data-cy="expense-category-select"
        data-testid="input-category"
      />
      <q-btn
        label="Adicionar Despesa"
        type="submit"
        color="primary"
        :disable="!isFormValid"
        data-cy="add-expense-button"
        data-testid="submit-btn"
      />
    </q-form>
  </q-card>
</template>

<script setup lang="ts">
import { ref, computed } from "vue";
import type { Expense } from "@/interfaces/Expense";
import { useExpensesStore } from "@/stores/expenses";
import { QForm } from "quasar";

const expensesStore = useExpensesStore();

const newExpense = ref<Omit<Expense, "id">>({
  name: "",
  amount: 0,
  category: "",
});

const maxAmount = 1000000;

const categoryOptions = ref<string[]>([
  "Alimentação",
  "Transporte",
  "Saúde",
  "Lazer",
]);

const form = ref<InstanceType<typeof QForm> | null>(null);

function addNewCategory(newCategory: string) {
  if (!categoryOptions.value.includes(newCategory)) {
    categoryOptions.value.push(newCategory);
  }
  newExpense.value.category = newCategory;
}

function addExpense() {
  if (isFormValid.value) {
    expensesStore.addExpense(newExpense.value);
    newExpense.value = {
      name: "",
      amount: 0,
      category: "",
    };
    form.value?.resetValidation();
  }
}

const isFormValid = computed(() => {
  return form.value?.validate() ?? false;
});
</script>

<style scoped>
.expense-controller {
  height: 40vh;
  width: 30vw;
}
</style>
