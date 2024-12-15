import { describe, it, expect, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import ExpenseTable from "../ExpenseList.vue";
import { Quasar } from "quasar";

describe("ExpenseTable.vue", () => {
  const mockExpenses = [
    { id: 1, name: "Despesa 1", category: "Alimentação", amount: 100.5 },
    { id: 2, name: "Despesa 2", category: "Transporte", amount: 50.0 },
    { id: 3, name: "Despesa 3", category: "Alimentação", amount: 200.75 },
    { id: 4, name: "Despesa 4", category: "Lazer", amount: 80.0 },
  ];

  const props = {
    expenses: mockExpenses
  }

  const mountWithQuasar = (props: any) => {
    return mount(ExpenseTable, {
      global: {
        plugins: [Quasar],
        provide: {
          $q: {
            dark: { isActive: false },
          },
        },
      },
      props,
    });
  };
  
  it("Renderizando com o numero correto de linhas", () => {
    const wrapper = mountWithQuasar(props);
    const rows = wrapper.findAll(".q-table tbody tr");
    expect(rows.length).toBe(3);
  });

  it("Validando busca por nome", async () => {
    const wrapper = mountWithQuasar(props);
    const searchInput = wrapper.find("input[type='text']");
    await searchInput.setValue("Despesa 1");
    
    const rows = wrapper.findAll(".q-table tbody tr");
    expect(rows.length).toBe(1);
    expect(rows[0].text()).toContain("Despesa 1");
  });  

  it("Validando categorias corretas", () => {
    const wrapper = mountWithQuasar(props);
    const categoryOptions = wrapper.vm.categoryOptions;
    expect(categoryOptions).toEqual(["Alimentação", "Transporte", "Lazer"]);
  });

  it("Formatando dados da coluna valor corretamente", () => {
    const wrapper = mountWithQuasar(props);
    const amountColumn = wrapper.vm.columns.find((col: any) => col.name === "amount");
    expect(amountColumn.format(123.45)).toBe("R$ 123.45");
  });
});
