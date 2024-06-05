import { CreateUserUseCase } from '../use-cases/create-user.js';

export class CreateUserController {
    async execute(httpRequest) {
        try {
            const params = httpRequest.body;
            console.log(params);

            // validate request (mandatory fields, password lenght, and email)
            const requiredFields = [
                'first_name',
                'last_name',
                'email',
                'password',
            ];
            for (const field of requiredFields) {
                if (!params[field] || params[field].trim().length === 0) {
                    return {
                        statusCode: 400,
                        body: {
                            errorMessage: `Missing param: ${field}`,
                        },
                    };
                }
            }

            // call use case
            const createUserUseCase = new CreateUserUseCase();
            const createdUser = await createUserUseCase.execute(params);

            //respond to the user (status code)
            return {
                statusCode: 201,
                body: createdUser,
            };
        } catch (error) {
            console.log(error);
            return {
                statusCode: 500,
                body: {
                    errorMessage: 'Internal Server Error',
                },
            };
        }
    }
}
