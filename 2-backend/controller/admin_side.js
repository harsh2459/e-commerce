var user = require('../model/admin');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');

exports.admin_create = async (req, res) => {
    var admin_email = await user.find({ email: req.body.email })
    if (admin_email == 0) {
        var data = await user.create(req.body);
        res.status(200).json({
            message: "Admin created successfully..!",
            data
        })
    }
    else {
        res.status(200).json({
            message: "Email Id Exist Try Another One..!",
        })
    }
}

exports.admin_login = async (req, res) => {
    var data = await user.find({ email: req.body.email });
    var user_pass = req.body.password

    if (data.length == 1) {
        
                var token = jwt.sign({ id: data[0].id }, 'admin');
                res.status(200).json({
                    status: "Login Success!",
                    token
                })
           
        
    } else {
        res.status(200).json({
            status: "Check Your Email And Password..!"
        })
    }

}

exports.admin_logout = async (req, res) => {
    res.status(200).json({
        status: "Logout success",
    })
}