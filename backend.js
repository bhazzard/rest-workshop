var express = require('express'),
    app = express.createServer(),
    db = require('./db');

app.use(express.bodyParser());
app.listen(process.env.PORT);

exports.storage = db;
exports.server = app;