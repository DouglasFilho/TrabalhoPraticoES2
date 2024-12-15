import { mount } from '@vue/test-utils';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Quasar } from 'quasar';
import ExpenseCategoryCard from '../ExpenseCategoryCard.vue';

describe('ExpenseCategoryCard.vue', () => {
  const props = {
    categoryName: 'Alimentação',
    totalAmount: 1500.75,
    expenseCount: 10,
    totalExpenses: 5000,
  };

  beforeEach(() => {
    globalThis.$q = {
      dark: { isActive: false },
    };
  });

  const mountWithQuasar = (props: any) => {
    return mount(ExpenseCategoryCard, {
      global: {
        plugins: [Quasar],
        mocks: {
          $q: globalThis.$q,
        },
      },
      props,
    });
  };

  it('Renderizando corretamente o nome da categoria', () => {
    const wrapper = mountWithQuasar(props);
    expect(wrapper.text()).toContain('Alimentação');
  });

  it('Renderizando corretamente o total da categoria', () => {
    const wrapper = mountWithQuasar(props);
    expect(wrapper.text()).toContain('R$ 1500.75');
  });

  it('Renderizando corretamente a quantidade de despesas', () => {
    const wrapper = mountWithQuasar(props);
    expect(wrapper.text()).toContain('10');
  });

  it('Verificando o calculo de porcentagem', () => {
    const wrapper = mountWithQuasar(props);
    expect(wrapper.text()).toContain('30.01%');
  });

  it('Verificando se o valor de porcentagem nao aparece quando o total nao e passado', () => {
    const wrapper = mountWithQuasar({ ...props, totalExpenses: null });
    expect(wrapper.text()).not.toContain('%');
  });
});
