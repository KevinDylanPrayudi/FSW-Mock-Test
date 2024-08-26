const db = require('../config/db');

async function main() {
    await db.user.deleteMany();
    await db.user.create({
        data: {
            firstName: 'John',
            lastName: 'Doe',
            email: 'johndoe@example.com',
            password: '123456'
        }
    })
}

main();