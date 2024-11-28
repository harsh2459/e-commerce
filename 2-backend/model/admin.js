var mongoose = require('mongoose')

var admin_login = new mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
})

module.exports = mongoose.model('admin', admin_login)