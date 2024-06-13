import validator from 'validator';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { serverError, ok, notFound } from './helpers/http.js';
import { invalidIdResponse } from './helpers/user.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const isIdValid = validator.isUUID(httpRequest.params.userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId
            );

            if (!user) {
                return notFound({ message: 'User not found' });
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
