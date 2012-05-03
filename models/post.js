var mongoose = require('./my_mongoose');

var PostSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: String, required: true },
    domain: { type: String },
    mentions: { type: Array },
    topics: { type: Array }
});

PostSchema.index({ user: 1 });
PostSchema.index({ domain: 1 });

PostSchema.pre('save', function(next) {
    this.topics = this.message.match(/#(\w+)/gi);
    next();
});
/*
PostSchema.pre('save', function(next) {
    this.mentions = this.message.match(/@(\w+)/gi);
    next();
});
*/
PostSchema.pre('save', function(next) {
    this.domain = this.user.split('@')[1];
    next();
});

var Post = mongoose.model('Post', PostSchema);

module.exports = Post;