const mongoose = require('mongoose');

// schema object
const Schema = mongoose.Schema;

// create model from schema object instance
const ProductDetailsSchema = new Schema({
    description: {
        type: String,
        required: [true, 'description is required!'],
        trim: true,
        minlength: 10,
        maxlength: 40,
    },
    image: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        required: [true, 'color is required!'],
        trim: true,
        maxlength: 12,
    },
    weight: {
        type: Number,
        required: [true, 'Weight is required!'],
        trim: true,
    },
    madeBy: {
        type: Schema.Types.ObjectId,
        ref: 'Manufacturer',
    },
    madeIn: {
        type: String,
        required: [true, 'name is required!'],
        trim: true,
        maxlength: 25,
    },
    modelNumber: { // part number
        type: String,
        required: [true, 'name is required!'],
        trim: true,
    },
    serialNumber: { // should be unique
        type: String,
        required: [true, 'name is required!'],
        trim: true,
    },
    universalProductCode: {
        type: Number,
        required: [true, 'UPC is required!'],
        trim: true,
        min: 12,
        max: 12,
    },
});

// export
module.exports = mongoose.model('ProductDetails', ProductDetailsSchema);