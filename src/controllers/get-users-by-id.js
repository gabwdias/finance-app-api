import validator from 'validator';
import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import { serverError, ok, badRequest } from './helpers.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const isIdValid = validator.isUUID(httpRequest.params.userId);
            if (!isIdValid) {
                return badRequest({ message: 'The provided ID is not valid' });
            }

            const user = await getUserByIdUseCase.execute(
                httpRequest.params.userId
            );

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
