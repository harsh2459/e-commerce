var user = require('../model/user');
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
var cart = require('../model/cart')

exports.user_create = async (req, res) => {
    var admin_email = await user.find({ email: req.body.email })
    if (admin_email == 0) {
        var data = await user.create(req.body);
        res.status(200).json({
            message: "user created successfully..!",
            data
        })
    }
    else {
        res.status(200).json({
            message: "Email Id Exist Try Another One..!",
        })
    }
}

exports.user_login = async (req, res) => {
    var data = await user.find({ email: req.body.email });
    var user_pass = req.body.password

    if (data.length == 1) {
        var token = jwt.sign({ id: data[0].id }, 'user');
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

exports.user_logout = async (req, res) => {
    res.status(200).json({
        status: "Logout success",
    })
}

exports.view_user = async (req, res) => {
    var data = await product.findById(req.params.id);
    res.status(200).json({
        status: "Logout success",
        data
    })
}

//  cart api

exports.addto_cart = async (req, res) => {
    var checkuser_login = await storage.getItem('id'); // Get the logged-in user's ID

    if (checkuser_login === undefined) {
        return res.status(200).json({
            status: "Login first",
        });
    }

    var data = await item.findById(req.body.product_id);
    var total = parseInt(req.body.total_item);
    var price = parseInt(data.price);
    req.body.price = parseInt(price);
    var total_price = total * price;

    // Add user ID and name to the request body
    req.body.user_id = checkuser_login; // Assuming checkuser_login contains the user ID
    var user_data = await user.findById(checkuser_login);
    req.body.user_name = user_data.name; // Get the user's name

    req.body.total = parseInt(total_price);
    var cartData = await cart.create(req.body);

    res.status(200).json({
        status: "cart done",
        data: cartData
    });
}


exports.view_cart = async (req, res) => {
    var userId = req.params.id; // Get the user ID from the request parameters

    // Find carts that match the user ID
    var data = await cart.find({ user_id: userId });

    // Check if any cart data is found
    if (data.length > 0) {
        res.status(200).json({
            status: "cart found",
            data
        });
    } else {
        res.status(200).json({
            status: "no cart found for this user",
        });
    }
}


exports.update_cart = async (req, res) => {
    var id = req.params.id
    var p_price = await cart.findById(id)
    var total = parseInt(req.body.total_item)
    var price = parseInt(p_price.price)

    var total_price = total * price;
    req.body.total = parseInt(total_price)
    var data = await cart.findByIdAndUpdate(id, req.body)
    res.status(200).json({
        status: "cart done",
        data
    })

}


exports.delete_cart = async (req, res) => {
    var id = req.params.id
    var data = await cart.findByIdAndDelete(id)
    res.status(200).json({
        status: "cart deleted",

    })

}


exports.payment = async (req, res) => {
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'harshbabariya2459@gmail.com',
            pass: 'babariya@2459'
        }
    });

    var checkuser_login = await storage.getItem('id')

    if (checkuser_login == undefined) {
        res.status(200).json({
            status: "Login first ",
        })
    }
    else {

        var id = req.params.id
        var t_payment = await cart.findById(id)

        var total = t_payment.total
        var total_item = t_payment.total_item

        var user_id = t_payment.user_id
        var name = await user.findById(user_id)
        var yourname = name.name

        var email = name.email
        console.log(email)

        var product_id = t_payment.product_id
        var name = await item.findById(product_id)
        var yourproduct = name.name

        var mailOptions = {
            from: 'harshbabariya2459@gmail.com',
            to: email,
            subject: 'Your payment  is successful',
            text: 'your name : ' + yourname + ' your product : ' + yourproduct + ' your quntyty : ' + total_item + ' your total pement : ' + total
        };

        transporter.sendMail(mailOptions, function (error, info) {
            if (error) {
                res.status(200).json({
                    status: "error",
                    error
                })
            } else {
                res.status(200).json({
                    status: "data sent ",

                })
            }
        });



    }
}
