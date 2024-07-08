export class DeleteTransactionUseCase {
    constructor(deleteTransactionRepository) {
        this.deleteTransactionRepository = this.deleteTransactionRepository;
    }
    async execute(transactionId) {
        const transaction =
            await this.deleteTransactionRepository.execute(transactionId);
        return transaction;
    }
}
