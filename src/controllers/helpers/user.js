import { badRequest } from '../helpers/http.js';

export const invalidPasswordResponse = () =>
    badRequest({
        message: 'Password must be at least 6 characters',
    });

export const invalidEmailResponse = () =>
    badRequest({
        message: 'Invalid e-mail. Please provide a valid one',
    });

export const userNotFoundResponse = () =>
    badRequest({
        message: 'User not found',
    });
