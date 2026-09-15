import { expect, test } from '@playwright/test';

interface GitHubUser {
  login: string;
  id: number;
  public_repos: number;
}

test.describe('GitHub Users API', () => {
  test('A1 - retorna os dados de um usuario existente', async ({ request }) => {
    const response = await request.get('/users/octocat');

    expect(response.status()).toBe(200);
    expect(response.headers()['content-type']).toContain('application/json');

    const user = (await response.json()) as GitHubUser;
    expect(user).toEqual(
      expect.objectContaining({
        login: 'octocat',
        id: expect.any(Number),
        public_repos: expect.any(Number),
      }),
    );
    expect(user.id).toBeGreaterThan(0);
    expect(user.public_repos).toBeGreaterThanOrEqual(0);
  });

  test('A2 - retorna 404 para um usuario inexistente', async ({ request }) => {
    const username = 'usuario-qa-inexistente-9f8e7d6c5b4a';

    const response = await request.get(`/users/${username}`);

    expect(response.status()).toBe(404);
    await expect(response.json()).resolves.toEqual(
      expect.objectContaining({ message: 'Not Found' }),
    );
  });
});
