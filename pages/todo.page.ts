import { expect, type Locator, type Page } from '@playwright/test';

export class TodoPage {
  readonly newTodoInput: Locator;
  readonly todoItems: Locator;
  readonly remainingCount: Locator;

  constructor(private readonly page: Page) {
    this.newTodoInput = page.getByPlaceholder('What needs to be done?');
    this.todoItems = page.locator('.todo-list li');
    this.remainingCount = page.locator('.todo-count');
  }

  async open(): Promise<void> {
    await this.page.goto('./');
    await expect(this.newTodoInput).toBeVisible();
  }

  async addTodos(titles: string[]): Promise<void> {
    for (const title of titles) {
      await this.newTodoInput.fill(title);
      await this.newTodoInput.press('Enter');
    }
  }

  itemByTitle(title: string): Locator {
    return this.todoItems.filter({ hasText: title });
  }

  async complete(title: string): Promise<void> {
    await this.itemByTitle(title).getByRole('checkbox').check();
  }

  async selectFilter(filter: 'All' | 'Active' | 'Completed'): Promise<void> {
    await this.page.getByRole('link', { name: filter, exact: true }).click();
  }
}
