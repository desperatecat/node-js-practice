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
        res.render('details', { blog: result, title: 'Blog Details'})
      })
      .catch(err => {
        console.log(err);
      });
  });
  
  app.delete('/blogs/:id', (req, res) => {
    const id = req.params.id;
    Blog.findByIdAndDelete(id)
      .then(result => {
        //send json data back to browser, then redirect from the f/e
        res.json({ redirect: '/blogs' })
      })
      .catch(err => {
        console.log(err)
      });
  });
  