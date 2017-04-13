const mongoose = require('mongoose');
const bCrypt = require('bcrypt-nodejs');
const crypto = require('crypto');

// schema object
const Schema = mongoose.Schema;

// user model or table
const UserSchema = new Schema({
    profile: {
        firstName: {
            type: String,
            required: [true, 'First name is required!'],
            trim: true,
            minlength: 3,
            maxlength: 15,
        },
        middleNameInitial: {
            type: String,
            required: false,
            trim: true,
            maxlength: 1,
        },
        lastName: {
            type: String,
            required: [true, 'Last name is required!'],
            trim: true,
            minlength: 3,
            maxlength: 20,
        },
        email: {
            type: String,
            unique: true,
            lowercase: true,
            required: [true, 'Unique Email is required'],
            trim: true,
            match: /.+\@.+\..+/,
        },
        phone: {
            type: String,
            trim: true,
            required: false,
            match: /\d{3}-\d{3}-\d{4}/,
            maxlength: 12,
        },
        headshot: {
            type: String,
            trim: true,
            required: false,
        },
    },
    address: {
        street: {
            type: String,
            trim: true,
            required: false,
            maxlength: 25,
        },
        aptNumber: {
            type: String,
            trim: true,
            required: false,
            maxlength: 5,
        },
        city: {
            type: String,
            trim: true,
            required: false,
            maxlength: 20,
        },
        state: {
            type: String,
            trim: true,
            required: false,
            maxlength: 20,
        },
        zip: {
            type: Number,
            trim: true,
            required: false,
            match: /\d{5}/,
            max: 5,
        },
    },
    login: {
        username: {
            type: String,
            lowercase: true,
            required: [true, 'Username is required for login'],
            index: { unique: true },
            trim: true,
            maxlength: 20,
        },
        password: {
            type: String,
            required: [true, 'Password is required for login'],
            // select: false,
            trim: true,
            validate: {
                validator: function(password) {
                    return password.length >= 6;
                },
                message: 'Password should be longer than 5',
            },
        },
    },
    history: [{
        date: Date,
        paid: { type: Number, default: 0 },
    }],
    joined: {
        type: Date,
        default: Date.now,
    },
});

// hash the password before saving...
UserSchema.pre('save', function(next) {
    let user = this;
    // hash the password only if the password has been changed or user is new
    if (!user.isModified('login.password')) {
        return next();
    }

    bCrypt.genSalt(10, function(err, salt) {
        if (err) {
            return next(err);
        }

        bCrypt.hash(user.login.password, salt, null, function(err, hash) {
            if (err) {
                return next(err);
            }
            // change the password to the hashed version
            user.login.password = hash;
            next();
        });
    });
});

// method to compare a given password with the database hash
UserSchema.methods.checkAndComparePassword = function(password) {
    let user = this;
    return bCrypt.compareSync(password, user.login.password);
};

// display username if first name does NOT exist
UserSchema.methods.displayFullName = function() {
    return this.profile.firstName + ' ' + this.profile.lastName;
};

// display gravatar
UserSchema.methods.gravatar = function(size) {
    if (!this.size) {
        size = 200;
    }

    if (!this.profile.email) {
        return 'https://gravatar.com/avatar/?s' + size + '&d=retro';
    }

    let md5 = crypto.createHash('md5').update(this.profile.email).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=' + size + '&d=retro';
};

// return the model
module.exports = mongoose.model('User', UserSchema);