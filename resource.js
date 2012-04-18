var backend = require('./backend');

function Resource(mediatype, configurator) {
    var postHandlers = {};
    this.allowPost = function(mediatype, handler) {
        postHandlers[mediatype] = handler;
    };
    
    this.post = function(mediatype, resource, posted) {
        if (postHandlers[mediatype]) {
            postHandlers[mediatype](resource, posted);
        }
    };
}

function resource(mediatype, configurator) {
    var resource = new Resource(mediatype, configurator);
    configurator.apply(resource);
    return resource;
}

module.exports = resource;