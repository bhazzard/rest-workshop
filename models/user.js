var mongoose = require('./my_mongoose'),

UserSchema = new mongoose.Schema({
    username: {type: String, default: "blue"},
    password: {type: String, default: "man"}
}),

User = mongoose.model('User', UserSchema);

module.exports = User;