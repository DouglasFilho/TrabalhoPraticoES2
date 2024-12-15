import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Pie } from 'vue-chartjs';
import { createTestingPinia } from '@pinia/testing';
import ExpenseChart from '../ExpenseChart.vue';

ChartJS.register(ArcElement, Tooltip, Legend);

describe('ExpenseChart.vue', () => {
  const mockCategories = [
    { category: 'Alimentação', total: 500 },
    { category: 'Aluguel', total: 1000 },
    { category: 'Transporte', total: 200 },
  ];

  const createWrapper = (categories = mockCategories) => {
    return mount(ExpenseChart, {
      global: {
        plugins: [
          createTestingPinia({
            initialState: {
              expenses: {
                existingCategoriesWithTotals: categories,
              },
            },
            createSpy: vi.fn,
          }),
        ],
        stubs: {
          Pie,
        },
      },
    });
  };

  it('Verificando se o componente esta sendo renderizado', () => {
    const wrapper = createWrapper();
    const chartComponent = wrapper.findComponent(Pie);

    expect(chartComponent.exists()).toBe(true);
  });

  it('Verificando se esta exibindo quando não há categorias', () => {
    const wrapper = createWrapper([]);
    const chartComponent = wrapper.findComponent(Pie);

    expect(chartComponent.props('data')).toEqual({
      labels: [],
      datasets: [
        {
          backgroundColor: [],
          data: [],
        },
      ],
    });
  });

  it('Verificando se as options do grafico estao sendo respeitadas', () => {
    const wrapper = createWrapper();
    const chartComponent = wrapper.findComponent(Pie);

    expect(chartComponent.props('options')).toEqual({
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
      },
    });
  });
});
