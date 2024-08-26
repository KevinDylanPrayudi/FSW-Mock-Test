const db = require('../config/db');

function get({ email }) {
    const result = db.user.findUnique({
        where: {
            email
        }
    });

    return result
}

module.exports = {
    get
}