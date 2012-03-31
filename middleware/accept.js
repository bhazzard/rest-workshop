var _ = require('underscore');

exports = function(accepted) {
    return function(req, res, next) {
        var provided = req.header('Content-Type');

        if (_.contains(accepted, provided)) {
            next();
        } else {
            res.send('Unsupported Media Type', 415);
        }
    };
};