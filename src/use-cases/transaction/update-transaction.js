import { UserNotFoundError } from '../../errors/user.js';

export class UpdateTransactionUseCase {
    constructor(updateTransactionRepository) {
        this.updateTransactionRepository = updateTransactionRepository;
    }

    async execute(transactionId, updateTransactionParams) {
        const transaction = await this.updateTransactionRepository.execute(
            transactionId,
            updateTransactionParams
        );

        return transaction;
    }
}
