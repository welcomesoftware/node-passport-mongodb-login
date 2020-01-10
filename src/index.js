const express = require('express');
const engine = require('ejs-mate');
const morgan = require('morgan');
const path = require('path');
const router = require('./routes');
const passport = require('passport');
const session = require('express-session');
const flash = require('connect-flash');


// Initializations
const app = express();
const mangoConnection = require('./database');
const auth = require('./passport/local');

// Settings
app.set('port', process.env.PORT || 5000);
app.engine('ejs', engine);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


// Middlewares
app.use(morgan('dev'));
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(session({secret: 'secretSession', resave: false, saveUninitialized: false}));
app.use(flash());
app.use(passport.initialize());
app.use(passport.session());

app.use((req, res, next) => {
    app.locals.signMsg = req.flash('signMsg');
    next();
});

// Routes
app.use(router);


// Starting the server
app.listen(app.get('port'), () => {
    console.log('Server running on port', app.get('port'));
});
