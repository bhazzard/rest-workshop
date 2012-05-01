var mongoose = require('./my_mongoose'),

UserSchema = new mongoose.Schema({
    username: {type: String, required: true },
    password: {type: String, required: true }
}),

User = mongoose.model('User', UserSchema);

module.exports = User;