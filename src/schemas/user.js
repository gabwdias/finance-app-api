import { z } from 'zod';

export const createUserSchema = z.object({
    first_name: z
        .string({ required_error: 'First Name is required' })
        .trim()
        .min(1, { message: 'First Name is required' }),
    last_name: z
        .string({ required_error: 'Last Name is required' })
        .trim()
        .min(1, { message: 'Last Name is required' }),
    email: z
        .string({ required_error: 'Email is required' })
        .email()
        .trim()
        .min(1),
    password: z
        .string({ required_error: 'Password is required' })
        .trim()
        .min(6),
});
