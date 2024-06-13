import { GetUserByIdUseCase } from '../use-cases/get-user-by-id.js';
import {
    serverError,
    ok,
    notFound,
    checkIfIdIsValid,
    invalidIdResponse,
} from './helpers/index.js';

export class GetUserByIdController {
    async execute(httpRequest) {
        try {
            const getUserByIdUseCase = new GetUserByIdUseCase();

            const isIdValid = checkIfIdIsValid(httpRequest.params.userId);
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
