import { test, expect } from '@playwright/test';
import { UserApi } from '../api/userApi';
import { ApiData } from '../fixtures/testData';

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
        const { status, body } = await api.getUserById(ApiData.validUserId);
        expect(status).toBe(200);
        expect(body!.data.id).toBe(ApiData.validUserId);
        expect(body!.data).toHaveProperty('email');
        expect(body!.data).toHaveProperty('first_name');
        expect(body!.data).toHaveProperty('last_name');
    });

    test('GET /users/:id - should return 404 for non-existent user', async ({ request }) => {
        const api = new UserApi(request);
        const { status, rawResponse } = await api.getUserById(ApiData.invalidUserId);
        expect(status).toBe(404);
        const body = await rawResponse.json();
        expect(body).toEqual({});
    });

    test('POST /users - should create a user and return 201', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.createUser(ApiData.newUser);
        expect(status).toBe(201);
        expect(body.name).toBe(ApiData.newUser.name);
        expect(body.job).toBe(ApiData.newUser.job);
        expect(body).toHaveProperty('id');
        expect(body).toHaveProperty('createdAt');
    });

    test('PUT /users/:id - should update a user and return 200', async ({ request }) => {
        const api = new UserApi(request);
        const { status, body } = await api.updateUser(ApiData.validUserId, ApiData.updatedUser);
        expect(status).toBe(200);
        expect(body.job).toBe(ApiData.updatedUser.job);
        expect(body).toHaveProperty('updatedAt');
    });

    test('DELETE /users/:id - should delete a user and return 204', async ({ request }) => {
        const api = new UserApi(request);
        const { status } = await api.deleteUser(ApiData.validUserId);
        expect(status).toBe(204);
    });
});
