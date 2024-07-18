import { PostgresHelper } from '../../../db/postgres/helper.js';

export class PostgresGetUserBalanceRepository {
    async execute(userId) {
        const result = await PostgresHelper.query(
            `
            SELECT 
                sum(CASE WHEN type = 'EARNING' then amount ELSE 0 END) as earnings,
                sum(CASE WHEN type = 'EXPENSE' then amount ELSE 0 END) as expenses,
                sum(CASE WHEN type = 'INVESTMENT' then amount ELSE 0 END) as investments,
                (
                    sum(CASE WHEN type = 'EARNING' then amount ELSE 0 END)
                    - sum(CASE WHEN type = 'EXPENSE' then amount ELSE 0 END)
                    - sum(CASE WHEN type = 'INVESTMENT' then amount ELSE 0 END)
                ) as balance
            FROM 
                transactions
            WHERE
                user_id = $1
            `,
            [userId]
        );

        return {
            userId,
            ...result[0],
        };
    }
}
