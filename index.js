const express = require('express');
const path = require('path');
const sessions = require('express-session');
const hbs = require('express-handlebars');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: { maxAge: 1000 * 60 * 60 * 24 },
    resave: false 
}));

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Custom Handlebars helpers
app.engine('hbs', hbs.engine({
    extname: 'hbs',
    defaultLayout: 'main',
    layoutsDir: path.join(__dirname, 'views/layouts'),
    helpers: {
        ifEquals: function (arg1, arg2, options) {
            return (arg1 == arg2) ? options.fn(this) : options.inverse(this);
        }
    }
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/users');

app.use('/', articleRoutes); 
app.use('/author', authorRoutes);
app.use('/', adminRoutes);
app.use('/users', userRoutes);

app.listen(3001, () => {
    console.log('App is started at http://localhost:3001');
});
