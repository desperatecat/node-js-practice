const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');

const app = express();

//connect to DB
const dbURI = 'mongodb+srv://netninja_admin:Test1234!@cluster0.bkzkh.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect();

//register view engine
app.set('view engine', 'ejs');

//listen for requests
app.listen(3000);

// middleware & static files
app.use(express.static('public'));

app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});

app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});

app.get('/', (req, res) => {
    const blogs = [
        {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
        {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
      ];
      
    res.render('index', { title: 'Home', blogs });
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

app.use((req, res) => {
    res.status(404).render('404', { title: '404' });
});