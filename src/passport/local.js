const passport = require('passport');
const localStrategy = require('passport-local').Strategy;

const User = require('../models/users');

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
});

passport.use('local_signup', new localStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, email, pass, done) => {
    const user = await User.findOne({email: email});
    if (user) {
        return done(null, false, req.flash('signMsg','The user already exist'));
    } else {
        const newUser = new User();
        newUser.email = email;
        newUser.pass = newUser.encryptPass(pass);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local_signin', new localStrategy({
    usernameField: 'email',
    passwordField: 'pass',
    passReqToCallback: true
}, async (req, email, pass, done) => {
    const user = await User.findOne({email: email});
    if (!user) {
        return done(null, false, req.flash('signMsg', 'The user has not found'));
    }
    if (!user.validatePass(pass)) {
        return done(null, false, req.flash('signMsg', 'The user credentials are incorrect'));
    }
    done(null, user);
}));
