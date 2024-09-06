const express = require('express');

const app = express();
app.use(express.json());

const articleRoutes = require('./routes/articles');
const authorRoutes = require('./routes/authors');  


app.use('/', articleRoutes); 
app.use('/author', authorRoutes);     

app.listen(3001, () => {
    console.log('App is started at http://localhost:3001');
});
