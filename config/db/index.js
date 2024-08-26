const { PrismaClient } = require('@prisma/client');
const bcrypt = require('bcrypt');

require('dotenv').config();

const prisma = new PrismaClient().$extends({
    query: {
        user: {
            $allOperations({ model, operation, args, query }) {
                if (operation === 'create' || operation === 'update') {
                    const SALT_ROUNDS = Number(process.env.SALT_ROUNDS);
                    args.data.password = bcrypt.hashSync(args.data.password,  SALT_ROUNDS || 10);
                }
                return query(args);
            }
        }
    }
});

module.exports = prisma;