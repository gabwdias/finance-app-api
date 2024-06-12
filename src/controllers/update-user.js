import validator from 'validator';
import { badRequest, ok, serverError } from './helpers.js';
import { UpdateUserUseCase } from '../use-cases/update-user.js';
import { EmailAlreadyInUseError } from '../errors/user.js';
import e from 'express';

export class UpdateUserController {
    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;

            const idIsNotValid = !validator.isUUID(userId);
            if (idIsNotValid) {
                return badRequest({
                    message: 'The provided ID is not valid',
                });
            }

            const updateUserParams = httpRequest.body;
            const allowedFields = [
                'first_name',
                'last_name',
                'password',
                'email',
            ];

            const someFieldIsNotAllowed = Object.keys(updateUserParams).some(
                (field) => !allowedFields.includes(field)
            );
            if (someFieldIsNotAllowed) {
                return badRequest({
                    message: 'Invalid field provided',
                });
            }

            if (updateUserParams.password) {
                const passwordIsNotValid = updateUserParams.password.length < 6;

                if (passwordIsNotValid) {
                    return badRequest({
                        message: 'Password must be at least 6 characters',
                    });
                }
            }

            if (updateUserParams.email) {
                const emailIsNotValid = !validator.isEmail(
                    updateUserParams.email
                );
                if (emailIsNotValid) {
                    return badRequest({
                        message: 'Invalid email. Please provide a valid one',
                    });
                }
            }

            const updateUserUseCase = new UpdateUserUseCase();
            const updatedUser = await updateUserUseCase.execute(
                userId,
                updateUserParams
            );

            return ok(updatedUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}
