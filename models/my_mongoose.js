var mongoose = require('mongoose');

mongoose.connect('mongodb://admin:password@staff.mongohq.com:10051/workshop');

module.exports = mongoose;