const express = require('express');
const router = express.Router();

const passport = require('passport');



router.get('/', isNotAuthenticated, (req, res, next) => {
    res.render('index', {
        title: "Mango login",
        status: "Server running"
    });
});

router.get('/signup', isNotAuthenticated, (req, res, next) => {
    res.render('signup', {
        title: "Mango login",
        status: "Server running"
    });
});

router.post('/signup', passport.authenticate('local_signup', {
    successRedirect: '/profile',
    failureRedirect: '/signup',
    passReqToCallback: true
}));

router.get('/signin', isNotAuthenticated, (req, res, next) => {
    res.render('signin', {
        title: "Mango login",
        status: "Server running"
    });
});

router.post('/signin', passport.authenticate('local_signin', {
    successRedirect: '/profile',
    failureRedirect: '/signin',
    passReqToCallback: true
}));

router.get('/logout', (req, res, next) => {
    req.logout();
    res.redirect('/');
});

router.use((req, res, next) => {
    isAuthenticated(req, res, next);
    next();
});

router.get('/profile', (req, res, next) => {
    res.render('profile', {
        title: "Mango login"
    });
});

router.get('/dashboard', (req, res, next) => {
    res.send('dashboard');
});


function isAuthenticated(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}

function isNotAuthenticated(req, res, next) {
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/profile');
}

module.exports = router;
