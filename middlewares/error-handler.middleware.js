const { Prisma } = require('@prisma/client');

function errorHandler(err, req, res, next) {
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
        if (err.code === 'P1001') {
            return res.status(400).json({
                status: 'fail',
                message: err.message
            });
        }
    }
}

module.exports = errorHandler
