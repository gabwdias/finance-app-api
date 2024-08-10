import { EmailAlreadyInUseError } from '../../errors/user.js';
import { badRequest, created, serverError } from '../helpers/index.js';
import { z, ZodError } from 'zod';
import { createUserSchema } from '../../schemas/index.js';

export class CreateUserController {
    constructor(createUserUseCase) {
        this.createUserUseCase = createUserUseCase;
    }

    async execute(httpRequest) {
        try {
            const params = httpRequest.body;

            // validate request (mandatory fields, password lenght, and email)
            await createUserSchema.parseAsync(params);

            // call use case
            const createdUser = await this.createUserUseCase.execute(params);

            //respond to the user (status code)
            return created(createdUser);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            if (error instanceof EmailAlreadyInUseError) {
                return badRequest({ message: error.message });
            }

            console.log(error);
            return serverError();
        }
    }
}
