const mongoose = require('mongoose');

// schema object
const Schema = mongoose.Schema;

// create model from schema object instance
const ManufacturerSchema = new Schema({
    company: {
        type: String,
        required: [true, 'manufacturer is required!'],
        trim: true,
        maxlength: 35,
    },
});

// export model
module.exports = mongoose.model('Manufacturer', ManufacturerSchema);