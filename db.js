var mongo = require('mongodb'),
    Server = mongo.Server,
    Db = mongo.Db;

var server = new Server('staff.mongohq.com', 10051, {auto_reconnect: true});
var db = new Db('workshop', server);

db.open(function(err, db) {
    db.authenticate('admin', 'password', function(err, result) {
    });
});

module.exports = db;