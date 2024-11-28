var mongoose = require('mongoose');

var cart = new mongoose.Schema({
    user_id: {
        type: String,
    },
    product_id: {
        type: String,
    },
    price: {
        type: String,
    },
    total_item: {
        type: String,
    },
    total: {
        type: String,
    }
})

module.exports = mongoose.model('cart', cart)