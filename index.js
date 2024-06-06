import 'dotenv/config.js';
import express from 'express';
import { CreateUserController } from './src/controllers/create-users.js';
import { GetUserByIdController } from './src/controllers/get-users-by-id.js';

const app = express();
app.use(express.json());

// app.get('/', async (req, res) => {
//     const results = await PostgresHelper.query('SELECT * FROM users;');
//     res.send(JSON.stringify(results));
// });

app.post('/api/users', async (req, res) => {
    const createUserController = new CreateUserController();
    const { statusCode, body } = await createUserController.execute(req);
    res.status(statusCode).json(body);
});

app.get('/api/users/:userId', async (req, res) => {
    const getUserByIdController = new GetUserByIdController();
    const { statusCode, body } = await getUserByIdController.execute(req);

    res.status(statusCode).send(body);
});

app.listen(process.env.PORT, () =>
    console.log(`App listening on port ${process.env.PORT}`)
);
