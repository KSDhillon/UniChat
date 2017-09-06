const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const UserSchema = new Schema({
    email: {
        type: String,
        lowercase: true,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    profile: {
        firstname: { type: String },
        lastname: { type: String }
    },
    role: {
        type: String,
        enum: ['Student', 'Professor', 'TA', 'Admin'],
        default: 'Student'
    },
    resetPasswordToken: {
        type: String
    },
    resetPasswordExpires: {
        type: Date
    }
},
{
    timestamps: true
});

//Hashing password before saving to database
UserSchema.pre('save', function(next) {
    const user = this;
    const SALT_FACTOR = 5;

    //check if password is new or modified
    if (!user.isModified('password')) return next();

    //else hash password
    bcrypt.genSalt(SALT_FACTOR, function(err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, null, function(err, hash) {
            if (err) return next(err);

            user.password = hash;
            next();
        });
    });
});

//Authenticating user password for login
UserSchema.methods.authenticatePassword = function(inputedPassword, next) {
    bcrypt.compare(inputedPassword, this.password, function(err, isMatch) {
        if (err) return next(err);

        next(null, isMatch);
    });
}

module.exports = mongoose.model('User', UserSchema);
