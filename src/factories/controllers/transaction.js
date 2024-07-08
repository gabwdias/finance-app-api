import {
    PostgresCreateTransactionRepository,
    PostgresGetUserByIdRepository,
    PostrgresUpdateTransactionRepository,
} from '../../repositories/postgres/index.js';
import {
    CreateTransactionUseCase,
    UpdateTransactionUseCase,
} from '../../use-cases/index.js';
import {
    CreateTransactionController,
    UpdateTransactionController,
} from '../../controllers/index.js';

export const makeCreateTransactionController = () => {
    const createTransactionRepository =
        new PostgresCreateTransactionRepository();
    const getUserByIdRepository = new PostgresGetUserByIdRepository();
    const createTransactionUseCase = new CreateTransactionUseCase(
        createTransactionRepository,
        getUserByIdRepository
    );
    const createTransactionController = new CreateTransactionController(
        createTransactionUseCase
    );

    return createTransactionController;
};

export const makeUpdateTransactionController = () => {
    const updateTransactionRepository =
        new PostrgresUpdateTransactionRepository();
    const updateTransactionUseCase = new UpdateTransactionUseCase(
        updateTransactionRepository
    );
    const updateTransactionController = new UpdateTransactionController(
        updateTransactionUseCase
    );

    return updateTransactionController;
};
