var db = require('./db');

db.collection('resources', function(err, collection) {
    collection.createIndex("_links.self.href");
});