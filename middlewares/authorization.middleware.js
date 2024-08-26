const passport = require('passport');
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const model = require('../models/users.model');

const opts = {}
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.JWT_SECRET;

passport.use(new JwtStrategy(opts, async function(jwt_payload, done) {
    try {
        const result = await model.get({email: jwt_payload.email});

        if (result) {
            return done(null, result);
        }

        return done(null, false);
    } catch(err) {
        return done(err, false);
    }
}));

function authorization(req, res, next) {
    passport.authenticate('jwt', { session: false }, (err, user, info) => {
        if (err) {
            return next(err);
        }
        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: info.message
            })
        }
        req.user = user;
        next();
    })(req, res, next);
}

module.exports = authorization;