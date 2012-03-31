var express = require('express'),
    app = express.createServer(),
    conneg = require('./middleware').conneg([
        'application/vnd.com.emailsrvr.mailbox-v1'
    ]),
    accept = conneg.accept,
    contentTypes = conneg.contentTypes;
    
var start = function(db, port) {
    app.use(express.bodyParser());
    
    app.get('/mailboxes/:id', function(req, res){
        db.collection('mailboxes', function(err, collection) {
            collection.findOne({'_id': req.params.id} , function(err, mailbox) {
                res.render(conneg.contentType(mailbox, 'application/vnd.com.emailsrvr.mailbox-v1').toHTML(), 200);
            });
        });
    });
    
    app.post('/mailboxes', accept(['application/vnd.com.emailsrvr.mailbox-v1']), function(req, res) {
        db.collection('mailboxes', function(err, mailboxes) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            mailboxes.insert(req.form.data);
            
            res.send("Thank you for your feedback!", 200);
        });
    });
    
    app.delete('/mailboxes', function(req, res) {
        db.collection('mailboxes', function(err, mailboxes) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            mailboxes.remove();
            
            res.send("Why'd you delete that?", 200);
        });
    });
    
    app.listen(port);
};

exports.start = start;