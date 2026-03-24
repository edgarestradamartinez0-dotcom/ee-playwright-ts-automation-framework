import { APIRequestContext } from '@playwright/test';

export interface User {
    id: number;
    email: string;
    first_name: string;
    last_name: string;
    avatar: string;
}

export interface UserListResponse {
    page: number;
    per_page: number;
    total: number;
    total_pages: number;
    data: User[];
}

export interface SingleUserResponse { data: User; }

export interface CreateUserPayload {
    name: string;
    job: string;
}

export interface CreateUserResponse {
    name: string;
    job: string;
    id: string;
    createdAt: string;
}

export class UserApi {
    private request: APIRequestContext;
    private baseURL: string = 'https://reqres.in/api';
    private headers: Record<string, string>;

    constructor(request: APIRequestContext) {
        this.request = request;
        this.headers = {
        'x-api-key': process.env.REQRES_API_KEY || '',
        };
    }

    async getUsers(page: number = 1) {
        const response = await this.request.get(`${this.baseURL}/users?page=${page}`, {
        headers: this.headers,
        });
        return {
        status: response.status(),
        body: await response.json() as UserListResponse,
        };
    }

    async getUserById(id: number) {
        const response = await this.request.get(`${this.baseURL}/users/${id}`, {
        headers: this.headers,
        });
        return {
        status: response.status(),
        body: response.status() === 200 ? await response.json() as SingleUserResponse : null,
        rawResponse: response,
        };
    }

    async createUser(payload: CreateUserPayload) {
        const response = await this.request.post(`${this.baseURL}/users`, {
        headers: this.headers,
        data: payload,
        });
        return {
        status: response.status(),
        body: await response.json() as CreateUserResponse,
        };
    }

    async updateUser(id: number, payload: Partial<CreateUserPayload>) {
        const response = await this.request.put(`${this.baseURL}/users/${id}`, {
        headers: this.headers,
        data: payload,
        });
        return {
        status: response.status(),
        body: await response.json(),
        };
    }

    async deleteUser(id: number) {
        const response = await this.request.delete(`${this.baseURL}/users/${id}`, {
        headers: this.headers,
        });
        return {
        status: response.status(),
        };
    }
}