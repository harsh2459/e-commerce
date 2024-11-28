var mongoose = require('mongoose')

var latest_product = new mongoose.Schema({
    name: {
        type: String,
    },
    description:{
        type:String,
    },
    price: {
        type: String
    },
    img:{
        type:String,
    },
    side_img_1:{
        type:String,
    },
    side_img_:{
        type:String,
    },
    category: {
        type: String,
    },
})

module.exports = mongoose.model('latest_product', latest_product)