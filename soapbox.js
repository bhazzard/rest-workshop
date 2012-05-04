var express = require('express'),
    app = express.createServer(express.bodyParser()),
    Post = require('./models/post');

/* lets do a simple twitter clone */
app.get('/domains/:domain/users/:user/posts', function(req, res) {
    Post.find(req.params, function(err, posts) {
        if (err) return res.send(err);
        res.send(posts);
    });
});

app.post('/domains/:domain/users/:user/posts', function(req, res) {
    var post = new Post(req.params);
    post.message = req.body.message;
    post.save(function(err) {
        if (err) return res.send(err);
        res.send(201);
    });
});

/* lets do a simple twitter clone */
app.get('/domains/:domain/users/:user/posts/:_id', function(req, res) {
    Post.findOne(req.params, function(err, posts) {
        res.render('post.ejs', posts);
    });
});

app.delete('/domains/:domain/users/:user/posts/:_id', function(req, res) {
    Post.remove(req.params, function(err) {
        res.send(err);
    });
});

app.get('/domains/:domain/topics/:topic', function(req, res) {
    Post.find({ topics: '#' + req.params.topic }, function(err, topics) {
        if (err) return res.send(err);
        res.send(topics);
    });
});

app.listen(process.env.PORT);