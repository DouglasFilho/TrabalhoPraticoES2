import { defineStore } from 'pinia';
import { v4 as uuidv4 } from 'uuid';


import type { Expense } from '@/interfaces/Expense';
import type { ExpensesState } from '@/interfaces/stores/ExpensesState';

export const useExpensesStore = defineStore('expenses', {
  state: (): ExpensesState => ({
    expenses: [],
  }),

  getters: {
    totalExpenses: (state) =>
      state.expenses.reduce((total, expense) => total + expense.amount, 0),

    expensesByCategory: (state) => {
      return state.expenses.reduce((categories: Record<string, number>, expense) => {
        categories[expense.category] = (categories[expense.category] || 0) + expense.amount;
        return categories;
      }, {});
    },
    existingCategoriesWithTotals: (state) => {
      const categories = state.expenses.reduce((acc, expense) => {
        if (!acc[expense.category]) {
          acc[expense.category] = { 
            category: expense.category, 
            total: 0, 
            count: 0
          };
        }
        acc[expense.category].total += expense.amount;
        acc[expense.category].count += 1;
        return acc;
      }, {} as Record<string, { category: string; total: number; count: number }>);
    
      return Object.values(categories);
    },    
  },

  actions: {
    addExpense(expense: Omit<Expense, 'id'>) {
      const id = uuidv4();
      this.expenses.push({ ...expense, id, color });
    },

    updateExpense(id: string, updatedExpense: Partial<Omit<Expense, 'id'>>) {
      const index = this.expenses.findIndex((expense) => expense.id === id);
      if (index !== -1) {
        this.expenses[index] = { ...this.expenses[index], ...updatedExpense };
      }
    },

    deleteExpense(id: string) {
      this.expenses = this.expenses.filter((expense) => expense.id !== id);
    },
  },
});
