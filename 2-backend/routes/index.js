var express = require('express');
var router = express.Router();
var lat_product = require('../controller/latest_product')
var user_data = require('../controller/user_side')
var admin = require('../controller/admin_side')

/* GET home page. */

// product
router.post('/add_product', lat_product.product_create);
router.get('/view_product', lat_product.product_view);
router.get('/single_product/:id', lat_product.single_product);

// user account
router.post('/add_user', user_data.user_create);
router.get('/get_user', user_data.view_user);
router.post('/user_login', user_data.user_login);
router.get('/user_logout', user_data.user_logout);

// admin side

router.post('/admin_create', admin.admin_create);
router.post('/admin_login', admin.admin_login);
router.get('/admin_logout', admin.admin_logout);

// cart
router.post('/add_cart', user_data.addto_cart);
router.post('/view_cart', user_data.view_cart);
router.post('/update_cart', user_data.update_cart);
router.post('/delete_cart', user_data.delete_cart);

// payment
router.post('/payment', user_data.payment);

module.exports = router;
