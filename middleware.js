var _ = require('underscore');

exports.conneg = function(types) {
    var forms = {};
    _.each(types, function(type) {
        var form = require('./media-types/' + type);
        if (form) forms[type] = form;
    });
    
    function handle(req, provided, accepted, callbacks) {
        var supported = _.keys(forms),
            acceptable = _.intersection(accepted, supported);
            
        if (_.contains(acceptable, provided)) {
            forms[provided].handle(req, {
                success: function(form) {
                    if (callbacks.success) callbacks.success(form);
                },
                error: function(form) {
                    if (callbacks.error) callbacks.error(form);
                },
                empty: function(form) {
                    if (callbacks.empty) callbacks.empty(form);   
                }
            });
        } else {
            if (callbacks.unsupported) callbacks.unsupported();
        }
    }
    
    return {
        accept: function(accepted) {
            return function(req, res, next) {
                handle(req, req.header('Content-Type'), accepted, {
                    success: function(form) {
                        req.form = form;
                        next();
                    },
                    error: function(form) {
                        res.send(form.toHTML(), 400);
                    },
                    unsupported: function() {
                        res.send('Unsupported Media Type', 415);
                    }
                });
            };
        },
        contentType: function(object, contentType) {
            return forms[contentType].bind(object);
        }
    }
};