import { EmailAlreadyInUseError } from '../../errors/user.js';
import {
    checkIfEmailIsValid,
    checkIfPasswordIsValid,
    invalidEmailResponse,
    invalidPasswordResponse,
    badRequest,
    created,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validate request (mandatory fields, password lenght, and email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            const requiredFieldsValidation = validateRequiredFields(
                params,
                requiredFields
            );
            if (!requiredFields.ok) {
                return badRequest({
                    message: `The field ${requiredFieldsValidation.missingField} is required`,
                });
            }

            const passwordIsValid = checkIfPasswordIsValid(params.password);
            if (!passwordIsValid) {
                return invalidPasswordResponse();
            }

            const emailIsValid = checkIfEmailIsValid(params.email);
            if (!emailIsValid) {
                return invalidEmailResponse();
            }

            // call use case
            const createdUser = await this.createUserUseCase.execute(params);

            //respond to the user (status code)
            return created(createdUser);
        } catch (error) {
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}
