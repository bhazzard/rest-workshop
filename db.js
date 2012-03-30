var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

function connect(callback) {
    var server = new Server('staff.mongohq.com', 10076, {auto_reconnect: true});
    var db = new Db('feedback', server);
    
    db.open(function(err, db) {
        if(err) callback(err, null);
        db.authenticate('feedback', 'password', function(err, result) {
            if (err) callback(err, db);

            callback(null, db);
        });
    });
}

exports.connect = connect;