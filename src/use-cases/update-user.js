import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class UpdateUserUseCase {
    constructor(getUserByEmailRepository, updateUserRepository) {
        this.getUserByEmailRepository = getUserByEmailRepository;
        this.updateUserRepository = updateUserRepository;
    }

    async execute(userId, updateUserParams) {
        //if updating email, check if it's already in use
        if (updateUserParams.email) {
            const userWithProvidedEmail =
                await this.getUserByEmailRepository.execute(
                    updateUserParams.email
                );

            if (userWithProvidedEmail && userWithProvidedEmail.id !== userId) {
                throw new EmailAlreadyInUseError(updateUserParams.email);
            }
        }

        const user = {
            ...updateUserParams,
        };

        //if updating password, encrypt it
        if (updateUserParams.password) {
            const hashedPassowrd = await bcrypt.hash(
                updateUserParams.password,
                10
            );
            user.password = hashedPassowrd;
        }

        //call the repository
        const updateUser = await this.updateUserRepository.execute(
            userId,
            user
        );

        return updateUser;
    }
}
