const passport = require('../utils/local-strategies');

const model = require('../models/auth.model');
const validator = require('../validators/auth.validator');

const { token } = require('../utils/jsonwebtoken');

async function registration(req, res, next) {
    try {
        await validator.registrationSchema.validateAsync(req.body);

        const result = await model.registration(req.body);

        res.status(200).json({
            status: 'success',
            message: 'User created successfully',
            data: result
        });
    } catch (error) {
        next(error);
    }
}

function login (req, res, next) {

    const { error } = validator.loginSchema.validate(req.body);
    if (error) {
        return next(error);
    }
    
    passport.authenticate('local', (err, user, info) => {
        if (err) {
            return next(err);
        }

        if (!user) {
            return res.status(400).json({
                status: 'fail',
                message: info.message
            })
        }

        return res.status(200).json({
            status: 'success',
            message: 'User logged in successfully',
            data: {
                token: token({
                    email: user.email
                })
            }
        });
    })(req, res, next)
}

module.exports = {
    registration,
    login
}