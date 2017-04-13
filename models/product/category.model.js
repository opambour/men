const mongoose = require('mongoose');

// Schema object instance
const Schema = mongoose.Schema;

// Category Schema
const CategorySchema = new Schema({
    name: {
        type: String,
        unique: true,
        lowercase: true,
        required: [true, 'name is required!'],
        trim: true,
        minlength: 3,
        maxlength: 15,
    },
});

// export model
module.exports = mongoose.model('Category', CategorySchema);