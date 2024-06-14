import 'dotenv/config.js';
import express from 'express';
import {
    GetUserByIdController,
    CreateUserController,
    UpdateUserController,
    DeleteUserController,
} from './src/controllers/index.js';
import {
    PostgresGetUserByIdRepository,
    PostegresCreateUserRepository,
    PostgresGetUserByEmailRepository,
    PostgresUpdateUserRepository,
    PostgresDeleteUserRepository,
} from './src/repositories/postgres/index.js';
import {
    UpdateUserUseCase,
    DeleteUserUseCase,
    GetUserByIdUseCase,
    CreateUserUseCase,
} from './src/use-cases/index.js';

const app = express();
app.use(express.json());

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const getUserByIdUseCase = new GetUserByIdUseCase(getUserByIdRepository);
    const getUserByIdController = new GetUserByIdController(getUserByIdUseCase);
    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.post('/api/users', async (req, res) => {
    const createUserRepository = new PostegresCreateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const createUserUseCase = new CreateUserUseCase(
        getUserByEmailRepository,
        createUserRepository
    );
    const createUserController = new CreateUserController(createUserUseCase);
    const { statusCode, body } = await createUserController.execute(req);
    res.status(statusCode).json(body);
});

app.patch('/api/users/:userId', async (req, res) => {
    const updateUserRepository = new PostgresUpdateUserRepository();
    const getUserByEmailRepository = new PostgresGetUserByEmailRepository();
    const updateUserUseCase = new UpdateUserUseCase(
        getUserByEmailRepository,
        updateUserRepository
    );
    const updateUserController = new UpdateUserController(updateUserUseCase);
    const { statusCode, body } = await updateUserController.execute(req);

    res.status(statusCode).send(body);
});

app.delete('/api/users/:userId', async (req, res) => {
    const deleteUserRepository = new PostgresDeleteUserRepository();
    const deleteUserUseCase = new DeleteUserUseCase(deleteUserRepository);
    const deleteUserController = new DeleteUserController(deleteUserUseCase);
    const { statusCode, body } = await deleteUserController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
);
