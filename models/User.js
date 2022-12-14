const { Schema, model } = require('mongoose');

const FULLNAME_PATTERN = /[A-Z][a-z]+\s[A-z][a-z]+/i;

const userSchema = new Schema({
    name: { type: String, required: true, match: [FULLNAME_PATTERN, 'Enter your full name'] },
    username: { type: String, required: true, unique: true, minlength: [5, 'Username must be at least 5 characters long'] },
    hashedPassword: { type: String, required: true }
});

userSchema.index({ username: 1, }, {
    collation: {
        locale: 'en',
        strength: 2
    }
});

const User = model('User', userSchema);
module.exports = User;