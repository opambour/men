const mongoose = require('mongoose');

// schema object
const Schema = mongoose.Schema;

// create model from schema object instance
const ProductSchema = new Schema({
    category: {
        type: Schema.Types.ObjectId,
        ref: 'Category',
    },
    name: {
        type: String,
        required: [true, 'name is required!'],
        trim: true,
    },
    price: {
        type: Number,
        required: [true, 'name is required!'],
        trim: true,
    },
    details: {
        type: Schema.Types.ObjectId,
        ref: 'ProductDetails',
    },
});

// export model /schema
module.exports = mongoose.model('Product', ProductSchema);