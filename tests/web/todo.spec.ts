import { expect, test } from '@playwright/test';
import { TodoPage } from '../../pages/todo.page';

const tasks = ['Estudar Playwright', 'Automatizar o desafio'];

test.describe('TodoMVC', () => {
  test.beforeEach(async ({ page }) => {
    const todoPage = new TodoPage(page);
    await todoPage.open();
  });

  test('W1 - adiciona tarefas e atualiza o contador de itens restantes', async ({ page }) => {
    const todoPage = new TodoPage(page);

    await todoPage.addTodos(tasks);

    await expect(todoPage.todoItems).toHaveCount(tasks.length);
    for (const task of tasks) {
      await expect(todoPage.itemByTitle(task)).toBeVisible();
    }
    await expect(todoPage.remainingCount).toContainText(`${tasks.length} items left`);
  });

  test('W2 - exibe a tarefa concluida somente no filtro Completed', async ({ page }) => {
    const todoPage = new TodoPage(page);
    const [completedTask, activeTask] = tasks;

    await todoPage.addTodos(tasks);
    await todoPage.complete(completedTask);

    await expect(todoPage.itemByTitle(completedTask)).toHaveClass(/completed/);
    await expect(todoPage.remainingCount).toContainText('1 item left');

    await todoPage.selectFilter('Completed');
    await expect(todoPage.itemByTitle(completedTask)).toBeVisible();
    await expect(todoPage.itemByTitle(activeTask)).toBeHidden();

    await todoPage.selectFilter('Active');
    await expect(todoPage.itemByTitle(completedTask)).toBeHidden();
    await expect(todoPage.itemByTitle(activeTask)).toBeVisible();
  });
});
