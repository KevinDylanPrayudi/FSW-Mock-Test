const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require('bcrypt');

const model = require('../models/users.model');

passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {
    try {
        const user = await model.get({ email });
        if (user && bcrypt.compareSync(password, user.password)) {
            return done(null, user);
        }
        return done(null, false, { message: 'email or password is incorrect' });
    } catch (err) {
        return done(err);
    }
}));

module.exports = passport