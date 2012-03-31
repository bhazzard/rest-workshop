var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

function connect(callback) {
    var server = new Server('staff.mongohq.com', 10051, {auto_reconnect: true});
    var db = new Db('workshop', server);
    
    db.open(function(err, db) {
        if(err) callback(err, null);
        db.authenticate('admin', 'password', function(err, result) {
            if (err) callback(err, db);

            callback(null, db);
        });
    });
}

exports.connect = connect;