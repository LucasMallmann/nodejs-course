const express = require('express');
const app = express();

app.use((req, res, next) => {
    console.log('In the middleware!');
    next(); // Allows the request to continue to the next middleware in line
});

app.use('/users', (req, res, next) => {
    console.log('in users middleware');
    res.send('<h1>dummy user</h1>');
});

app.use('/', (req, res, next) => {
    console.log('in home middleware');
    res.send('<h1>Home</h1>');
})

app.listen(3001);
