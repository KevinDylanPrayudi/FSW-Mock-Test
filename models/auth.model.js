const db = require('../config/db');

function registration(data) {
    const result = db.user.create({
        data: {
            firstName: data.firstname,
            lastName: data.lastname,
            email: data.email,
            password: data.password
        }
    });

    return result
}

module.exports = {
    registration
}