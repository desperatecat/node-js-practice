const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const Blog = require('./models/blog');

const app = express();

//connect to mongoDB
const dbURI = 'mongodb+srv://netninja_admin:Test1234!@cluster0.bkzkh.mongodb.net/node-tuts?retryWrites=true&w=majority';
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => app.listen(3000))
  .catch(err => console.log(err));

//register view engine
app.set('view engine', 'ejs');

// middleware & static files
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));
app.use(morgan('dev'));

app.use((req, res, next) => {
  res.locals.path = req.path;
  next();
});


// mongoose & mongo tests
app.get('/add-blog', (req, res) => {

  //create document
  const blog = new Blog({
    title: 'new blog 2',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })

  //sync save to DB
  blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});


app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    })
});

app.get('/single-blog', (req, res) => {
  Blog.findById('5f407aaa95931c12ec631191')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});

//routes
app.get('/', (req, res) => {
    res.redirect('/blogs');
});

app.get('/about', (req, res) => {
    res.render('about', { title: 'About' });
});

//blog routes
app.get('/blogs', (req, res) => {
    Blog.find().sort({ createdAt: -1 })
      .then(result => {
        res.render('index', { blogs: result, title: 'All blogs' })
      })
      .catch(err => {
        console.log(err);
      });

});

app.get('/blogs/create', (req, res) => {
    res.render('create', { title: 'Create a new blog' });
  });

app.post('/blogs', (req, res) => {
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});

app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      render('details', { blog: result, title: 'Blog Details'})
    })
    .catch(err => {
      console.log(err);
    });
});


// 404 page
app.use((req, res) => {
  res.status(404).render('404', { title: '404' });
});