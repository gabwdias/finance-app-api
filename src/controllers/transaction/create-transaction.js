import { ZodError } from 'zod';
import { createTransactionSchema } from '../../schemas/index.js';
import { badRequest, created, serverError } from '../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequestParams) {
        try {
            const params = httpRequestParams.body;

            await createTransactionSchema.parseAsync(params);

            const transaction =
                await this.createTransactionUseCase.execute(params);
            return created(transaction);
        } catch (error) {
            if (error instanceof ZodError) {
                return badRequest({ message: error.errors[0].message });
            }
            console.log(error);
            return serverError();
        }
    }
}
