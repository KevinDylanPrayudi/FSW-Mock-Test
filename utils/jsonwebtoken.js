const jwt = require('jsonwebtoken');

module.exports = {
    token: (data) => {
        return jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
    }
}