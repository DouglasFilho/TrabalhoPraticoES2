<template>
  <main class="index-page">
    <div class="index-page__title q-my-md">
      <h5>Controle de Despesas Pessoais</h5>
    </div>

    <div class="index-page__container">
      <div class="index-page__container__base row">
        <div class="index-page__container__base__expanse-creator col-4">
          <ExpanseCreator />
        </div>
        <div class="index-page__container__base__expanse-list col-7">
          <ExpenseList :expenses="expensesStore.expenses" />
        </div>
      </div>
      <div class="index-page__container__details row">
        <div class="index-page__container__details__chart col-4">
          <ExpenseChart />
        </div>
        <div class="index-page__container__details__cards col-8">
          <h5 v-if="expensesStore.existingCategoriesWithTotals.length" class="q-mt-xl">
            Total por categorias
          </h5>
          <div class="index-page__container__details__cards__scroll-area">
            <div class="index-page__container__details__cards__cards-wrapper">
              <ExpenseCategoryCard
                :class="!index ? 'q-mr-sm' : 'q-mx-sm'"
                v-for="(category, index) in expensesStore.existingCategoriesWithTotals"
                :key="category.category"
                :category-name="category.category"
                :expense-count="category.count"
                :total-amount="category.total"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script setup lang="ts">
import ExpanseCreator from '@/components/ExpenseCreator.vue';
import ExpenseChart from '@/components/ExpenseChart.vue';
import ExpenseCategoryCard from '@/components/ExpenseCategoryCard.vue';
import ExpenseList from '@/components/ExpenseList.vue';

import { useExpensesStore } from '@/stores/expenses';
const expensesStore = useExpensesStore();
</script>

<style scoped lang="scss">
.index-page {
  width: 100%;
  height: 100%;
  &__title {
    display: flex;
    justify-content: center;
  }

  &__container {
    &__base {
      display: flex;
    }

    &__details {
      display: flex;
      align-items: top;

      &__cards {
        &__scroll-area {
          display: flex;
          overflow-x: auto;
          white-space: nowrap;
          padding: 8px;
          gap: 16px;
          scroll-behavior: smooth;
        }

        &__cards-wrapper {
          display: inline-flex;
        }
      }
    }
  }
}
</style>
