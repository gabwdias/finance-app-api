import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';

import {
    PostegresCreateUserRepository,
    PostgresGetUserByEmailRepository,
} from '../repositories/postgres/index.js';
import { EmailAlreadyInUseError } from '../errors/user.js';

export class CreateUserUseCase {
    async execute(createUserParams) {
        //verify if email is already on use
        const postgresGetUserByEmailRepository =
            new PostgresGetUserByEmailRepository();
        const userWithProvidedEmail =
            await postgresGetUserByEmailRepository.execute(
                createUserParams.email
            );

        if (userWithProvidedEmail) {
            throw new EmailAlreadyInUseError(createUserParams.email);
        }

        //generate user ID
        const userId = uuidv4();

        //encrypt password
        const hashedPassowrd = await bcrypt.hash(createUserParams.password, 10);

        //populate the user
        const user = {
            id: userId,
            password: hashedPassowrd,
            first_name: createUserParams.first_name,
            last_name: createUserParams.last_name,
            email: createUserParams.email,
        };

        const postgresCreateUserRepository =
            new PostegresCreateUserRepository();
        const createdUser = await postgresCreateUserRepository.execute(user);
        return createdUser;
    }
}
