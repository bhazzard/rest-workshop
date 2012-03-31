var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

function connect(callback) {
    var server = new Server('staff.mongohq.com', 10076, {auto_reconnect: true});
    var db = new Db('rest-workshop', server);
    
    db.open(function(err, db) {
        if(err) callback(err, null);
        db.authenticate('rest-workshop', 'password', function(err, result) {
            if (err) callback(err, db);

            callback(null, db);
        });
    });
}

exports.connect = connect;