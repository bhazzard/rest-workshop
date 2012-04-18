var express = require('express'),
    app = express.createServer();

/* lets do a simple twitter clone */
var User = require('./models/user');
app.get('/register', function(req, res) {

});

app.post('/register', function(req, res) {
    var u = new User();
    u.save();
    res.send();
});

app.post('/message', function(req, res) {
    
});

app.get('/users/:id', function(req, res) {
    
});

app.get('/users/:id/followers', function(req, res) {
    
});

app.get('/topics/:topic', function(req, res) {
    
});

app.listen(process.env.PORT);