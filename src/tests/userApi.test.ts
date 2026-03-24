import { test, expect } from '@playwright/test';
import { UserApi } from '../api/userApi';

test.describe('User API', () => {

    test('GET /users - should return list of users with status 200', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.getUsers();
        expect(status).toBe(200);
        expect(body.data.length).toBeGreaterThan(0);
        expect(body.page).toBe(1);
    });

    test('GET /users - should return correct pagination fields', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.getUsers();
        expect(status).toBe(200);
        expect(body).toHaveProperty('total');
        expect(body).toHaveProperty('total_pages');
        expect(body).toHaveProperty('per_page');
        expect(typeof body.total).toBe('number');
    });

    test('GET /users/:id - should return single user with status 200', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.getUserById(1);
        expect(status).toBe(200);
        expect(body!.data.id).toBe(1);
        expect(body!.data).toHaveProperty('email');
        expect(body!.data).toHaveProperty('first_name');
        expect(body!.data).toHaveProperty('last_name');
    });

    test('GET /users/:id - should return 404 for non-existent user', async ({ request }) => {
        const api = new UserApi(request);
        const { status, rawResponse } = await api.getUserById(9999);
        expect(status).toBe(404);
        const body = await rawResponse.json();
        expect(body).toEqual({});
    });

    test('POST /users - should create a user and return 201', async ({ request }) => {
        const api = new UserApi(request);
        const payload = { name: 'Edgar', job: 'Senior QA Engineer' };
        const { status, body } = await api.createUser(payload);
        expect(status).toBe(201);
        expect(body.name).toBe('Edgar');
        expect(body.job).toBe('Senior QA Engineer');
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');
    });

    test('PUT /users/:id - should update a user and return 200', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.updateUser(1, { job: 'Lead QA Engineer' });
        expect(status).toBe(200);
        expect(body.job).toBe('Lead QA Engineer');
        expect(body).toHaveProperty('updatedAt');
    });

    test('DELETE /users/:id - should delete a user and return 204', async ({ request }) => {
        const api = new UserApi(request);
        const { status } = await api.deleteUser(1);
        expect(status).toBe(204);
    });
});
