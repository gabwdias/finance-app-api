import { GetUserByIdUseCase } from '../use-cases/index.js';
import {
    serverError,
    ok,
    notFound,
    checkIfIdIsValid,
    invalidIdResponse,
    userNotFoundResponse,
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
                return userNotFoundResponse();
            }

            return ok(user);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
