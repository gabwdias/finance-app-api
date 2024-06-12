import bcrypt from 'bcrypt';
import { EmailAlreadyInUseError } from '../errors/user.js';
import { PostgresGetUserByEmailRepository } from '../repositories/postgres/get-user-by-email.js';
import { PostgresUpdateUserRepository } from '../repositories/postgres/update-user.js';

export class UpdateUserUseCase {
    async execute(userId, updateUserParams) {
        //if updating email, check if it's already in use
        if (updateUserParams.email) {
            const postgresGetUserByEmailRepository =
                new PostgresGetUserByEmailRepository();
            const userWithProvidedEmail =
                await postgresGetUserByEmailRepository.execute(
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
        const postgresUpdateUserRepository = new PostgresUpdateUserRepository();
        const updateUser = await postgresUpdateUserRepository.execute(
            userId,
            user
        );

        return updateUser;
    }
}
