var express = require('express'),
    app = express.createServer(express.bodyParser());

/* lets do a simple twitter clone */
var User = require('./models/user');
app.get('/register', function(req, res) {
    res.render('registration.ejs');
});

app.post('/register', function(req, res) {
    var user = new User();
    user.username = req.body.username;
    user.password = req.body.password;
    user.save(function(err) {
        if (err) return res.send(err, 400);
        
        res.header('Location', '/users/' + user._id);
        res.statusCode(201);
        res.render('user/show.ejs', user);
    });
});

app.get('/users/:id', function(req, res) {
    User.findOne({_id: req.params.id}, function(err, user) {
       if (err) return res.send(err, 404);
       
       res.render('user/show.ejs', user);
    });
});

app.post('/users/:id', function(req, res) {
    User.update({_id: req.params.id}, req.body, function(err, user) {
       if (err) return res.send(err, 404);
       
       res.render('user/show.ejs', 202);
    });
});

app.get('/users/:id/followers', function(req, res) {
    
});

app.get('/topics/:topic', function(req, res) {
    
});

app.listen(process.env.PORT);