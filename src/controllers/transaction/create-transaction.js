import validator from 'validator';
import {
    badRequest,
    checkIfIdIsValid,
    created,
    invalidIdResponse,
    serverError,
    validateRequiredFields,
} from '../helpers/index.js';

export class CreateTransactionController {
    constructor(createTransactionUseCase) {
        this.createTransactionUseCase = createTransactionUseCase;
    }

    async execute(httpRequestParams) {
        try {
            const params = httpRequestParams.body;

            //validade mandatory fields
            const requiredFields = [
                'user_id',
                'name',
                'date',
                'amount',
                'type',
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

            //validate user is valid
            const userIdIsValid = checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            //validate if amount is gt than 0
            if (params.amount <= 0) {
                return badRequest({
                    message: 'The amount must be greater than 0',
                });
            }

            const amountIsValid = validator.isCurrency(
                params.amount.toString(),
                {
                    digits_after_decimal: [2],
                    allow_negatives: false,
                }
            );

            if (!amountIsValid) {
                return badRequest({
                    message: 'The amount must be a valid currency',
                });
            }

            //validate if type is valide
            const type = params.type.trim().toUpperCase();
            const typeIsValid = ['EARNING', 'EXPENSE', 'INVESTMENT'].includes(
                type
            );
            if (!typeIsValid) {
                return badRequest({
                    message: 'The type must be EARNING, EXPENSE or INVESTMENT',
                });
            }

            const transaction = await this.createTransactionUseCase.execute({
                ...params,
                type,
            });
            return created(transaction);
        } catch (error) {
            console.log(error);
            return serverError();
        }
    }
}
