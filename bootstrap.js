var endpoint = require('./endpoint');

endpoint('/', function() {
   this.resource('contacts', function() {
       this.allowPost('contact', function(contactlist, person) {
           contactlist.contacts.push(person);
           this.save(contactlist);
       });
   });
});