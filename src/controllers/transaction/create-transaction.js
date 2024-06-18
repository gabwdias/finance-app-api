import {
    checkIfAmountIsValid,
    checkIfIdIsValid,
    checkIfTypeIsValid,
    created,
    invalidAmountResponse,
    invalidIdResponse,
    invalidTypeResponse,
    requiredFieldIsMissingResponse,
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

            if (requiredFields.ok == false) {
                return requiredFieldIsMissingResponse(
                    requiredFieldsValidation.missingField
                );
            }

            //validate user is valid
            const userIdIsValid = checkIfIdIsValid(params.user_id);
            if (!userIdIsValid) {
                return invalidIdResponse();
            }

            const amountIsValid = checkIfAmountIsValid(params.amount);

            if (!amountIsValid) {
                return invalidAmountResponse();
            }

            //validate if type is valide
            const type = params.type.trim().toUpperCase();
            const typeIsValid = checkIfTypeIsValid(type);
            if (!typeIsValid) {
                return invalidTypeResponse();
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
