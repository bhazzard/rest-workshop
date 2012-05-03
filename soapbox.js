var express = require('express'),
    app = express.createServer(express.bodyParser()),
    Post = require('./models/post');

/* lets do a simple twitter clone */
app.get('/users/:user/posts', function(req, res) {
    Post.find(req.params, function(err, posts) {
        res.send(posts);
    });
});

app.post('/users/:user/posts', function(req, res) {
    var post = new Post();
    post.user = req.params.user;
    post.message = "blah #asdf or #wojd";
    post.save(function(err) {
        res.send(err);
    });
});

/* lets do a simple twitter clone */
app.get('/users/:user/posts/:_id', function(req, res) {
    Post.findOne(req.params, function(err, posts) {
        res.send(posts);
    });
});

app.delete('/users/:user/posts/:_id', function(req, res) {
    Post.remove(req.params, function(err) {
        res.send(err);
    });
});

app.get('/topics/:topic', function(req, res) {
    
});

app.listen(process.env.PORT);