const model = require('../models/users.model');

function get(req, res, next) {
    try {
        res.status(200).json({
            status: 'success',
            data: req.user
        });
    } catch (error) {
        next(error);
    }
}

module.exports = {
    get
}