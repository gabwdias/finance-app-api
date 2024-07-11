import {
    checkIfIdIsValid,
    invalidIdResponse,
    noTransactionsFoundResponse,
    ok,
    serverError,
    transactionNotFoundResponse,
} from '../helpers/index.js';

export class GetTransactionsByUserIdController {
    constructor(getTransactionsByUserIdUseCase) {
        this.getTransactionsByUserIdUseCase = getTransactionsByUserIdUseCase;
    }

    async execute(httpRequest) {
        try {
            const userId = httpRequest.params.userId;
            const isIdValid = checkIfIdIsValid(userId);
            if (!isIdValid) {
                return invalidIdResponse();
            }

            const transactions =
                await this.getTransactionsByUserIdUseCase.execute(userId);
            if (transactions.length == 0) {
                return noTransactionsFoundResponse();
            }

            return ok(transactions);
        } catch (error) {
            console.log(error);
            return serverError(error);
        }
    }
}
