var express = require('express'),
    app = express.createServer();
    
var start = function(db, port) {
    app.use(express.bodyParser());
    
    app.get('/ideas', function(req, res){
        db.collection('ideas', function(err, collection) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            collection.find().toArray(function(err, items) {
                res.send(items, 200);
            });
        });
    });
    
    app.post('/ideas', function(req, res) {
        db.collection('ideas', function(err, ideas) {
            if (err) {
                res.send("Problem with ideas collection!", 500);
                return;
            }
            
            ideas.insert(req.body);
            
            res.send("Thank you for your feedback!", 200);
        });
    });
    
    app.delete('/ideas', function(req, res) {
        db.collection('ideas', function(err, ideas) {
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