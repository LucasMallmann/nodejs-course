const express = require('express');
const bodyParser = require('body-parser');

const app = express();

app.use((req, res, next) => {
  console.log('In the middleware!');
  next(); // Allows the request to continue to the next middleware in line
});


app.use(bodyParser.urlencoded());

app.use('/', (req, res, next) => {
  console.log('This ALWAYS runs!');
  next();
});

app.use('/add-product', (req, res, next) => {
  console.log('in products middleware');
  res.send('<form action="/product" method="POST"><input type="text" name="product"><button type="submit">Add</button></input></form>');

})

app.use('/product', (req, res, next) => {
  console.log(req.body);
  res.redirect('/');
});

app.use('/', (req, res, next) => {
  console.log('In another middleware!');
  res.send('<h1>Hello from Express!</h1>');
});

app.listen(3000);
