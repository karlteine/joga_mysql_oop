const express = require('express');
const sessions = require('express-session')

const app = express();
app.use(express.json());

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');
const adminRoutes = require('./routes/admin')  

app.use(express.urlencoded({ extended: true }));

app.use(sessions({
    secret: "thisismysecretkey",
    saveUninitialized: true,
    cookie: {maxAge: 1000 * 60 * 60 * 24},
    resave: false 
}))

app.use('/', articleRoutes); 
app.use('/author', authorRoutes);
app.use('/', adminRoutes);    

const userRoutes = require('./routes/users')
app.use('/', userRoutes)

app.listen(3001, () => {
    console.log('App is started at http://localhost:3001');
});
