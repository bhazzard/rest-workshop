var express = require('express'),
    app = express.createServer(),
    accept = require('./middleware/accept');
    
var start = function(db, port) {
    app.use(express.bodyParser());
    
    app.get('/', function(req, res) {
        res.send('Welcome to our service');
    });
    
    app.get('/mailboxes', function(req, res){
        db.collection('mailboxes', function(err, collection) {
            collection.find().toArray(function(err, mailboxes) {
                res.send(mailboxes, 200);
            });
        });
    });
    
    app.post('/mailboxes', accept(['application/vnd.com.emailsrvr.mailbox-v1']), function(req, res) {
        db.collection('mailboxes', function(err, ideas) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            ideas.insert(req.body);
            
            res.send("Thank you for your feedback!", 200);
        });
    });
    
    app.delete('/mailboxes', function(req, res) {
        db.collection('mailboxes', function(err, ideas) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            ideas.remove();
            
            res.send("Why'd you delete that?", 200);
        });
    });
    
    app.listen(port);
};

exports.start = start;