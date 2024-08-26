const { Prisma } = require('@prisma/client');
const Joi = require('joi');

function errorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P1001') {
            return res.status(400).json({
                status: 'fail',
                message: err.message
            });
        } else if (err.code === 'P2002') {
            return res.status(400).json({
                status: 'fail',
                message: 'Email already exists'
            });
        }
    } else if (err.isJoi) {
        return res.status(400).json({
            status: 'fail',
            message: err.message
        });
    }

    console.log(err.stack);
    res.status(500).json({
        status: 'fail',
        message: 'Something went wrong'
    })
}

module.exports = errorHandler
