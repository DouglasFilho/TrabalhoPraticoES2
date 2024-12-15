import { mount } from '@vue/test-utils';
import { describe, it, expect, vi } from 'vitest';
import ExpenseCreator from '../ExpenseCreator.vue';
import { Quasar } from 'quasar';
import { createTestingPinia } from '@pinia/testing';

describe('ExpenseCreator.vue', () => {
  it('deve renderizar o formulário corretamente', () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn, // Cria spys automaticamente para stores usados
          }),
        ],
      },
    });

    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('deve validar o campo "Nome" vazio', async () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const nameInput = wrapper.find('[data-testid="input-name"]');

    await nameInput.setValue('');
    expect(wrapper.find('.q-field__messages').exists()).toBe(true);
  });

  it('deve validar o campo "Nome" acima de 50 caracteres', async () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const nameInput = wrapper.find('[data-testid="input-name"]');

    const longName = 'A'.repeat(51);
    await nameInput.setValue(longName);
    expect(wrapper.find('.q-field__messages').exists()).toBe(true);
  });

  it('deve validar o campo "Valor" vazio', async () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const amountInput = wrapper.find('[data-testid="input-amount"]');

    await amountInput.setValue('');
    expect(wrapper.find('.q-field__messages').exists()).toBe(true);
  });

  it('deve validar o campo "Valor" negativo', async () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const amountInput = wrapper.find('[data-testid="input-amount"]');

    await amountInput.setValue(-1);
    expect(wrapper.find('.q-field__messages').exists()).toBe(true);
  });

  it('deve validar o campo "Categoria" vazio', async () => {
    const wrapper = mount(ExpenseCreator, {
      global: {
        plugins: [
          Quasar,
          createTestingPinia({
            createSpy: vi.fn,
          }),
        ],
      },
    });

    const categoryInput = wrapper.find('[data-testid="input-category"]');

    await categoryInput.setValue(null);
    expect(wrapper.find('.q-field__messages').exists()).toBe(true);
  });  
});
