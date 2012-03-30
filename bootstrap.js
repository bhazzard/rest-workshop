var db = require('./db'),
    app = require('./app');
    
db.connect(function(err, db_connection) {
    if (err) throw err;
    
    app.start(db_connection, process.env.PORT);
});