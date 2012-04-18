var resource = require('./resource'),
    backend = require('./backend');

function Endpoint(route) {
    var resources = {};
    
    this.resource = function(mediatype, configurator) {
        resources[mediatype] = resource(mediatype, configurator);
    };
    
    backend.server.all(route + '*', function(req, res, next) {
        backend.storage.collection('resources', function(err, collection) {
            collection.findOne({ "_links.self.href": req.url  }, function(err, resource) {
                req.resource = resource;
                next();
            });
        });
    });
    
    backend.server.get(route + '*', function(req, res) {
        res.send(req.resource, 200);
    });
    
    backend.server.post(route + '*', function(req, res) {
        if (resources['contacts']) {
            resources['contacts'].post(req.header('Content-Type'), req.resource, req.body);
            res.send(200);
        }
    });
}

function endpoint(url, configurator) {
    var endpoint = new Endpoint(url);  
    configurator.apply(endpoint);
}

module.exports = endpoint;