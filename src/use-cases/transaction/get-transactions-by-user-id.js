export class GetTransactionsByUserIdUseCase {
    constructor(getTransactionsByIdRepository) {
        this.getTransactionsByIdRepository = getTransactionsByIdRepository;
    }
    async execute(userId) {
        const transactions =
            await this.getTransactionsByIdRepository.execute(userId);

        return transactions;
    }
}
