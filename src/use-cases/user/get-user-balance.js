import { UserNotFoundError } from '../../errors/user.js';

export class GetUserBalanceUseCase {
    constructor(getUserBalanceRepository, getUserByIdRepository) {
        this.getUserBalanceRepository = getUserBalanceRepository;
        this.getUserByIdRepository = getUserByIdRepository;
    }

    async execute(params) {
        const { userId } = params;

        const user = await this.getUserByIdRepository.execute(userId);
        if (!user) {
            throw new UserNotFoundError();
        }

        const result = await this.getUserBalanceRepository.execute(userId);

        return result;
    }
}
