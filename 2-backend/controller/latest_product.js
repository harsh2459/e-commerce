var product = require('../model/latest_pro');

exports.product_create = async (req, res) => {
    var data = await product.create(req.body);
        res.status(200).json({
            message: "product created successfully..!",
            data
        })
}

exports.product_view = async (req, res) => {
    var data = await product.find();
        res.status(200).json({
            message: "data",
            data
        })
}

exports.single_product = async (req, res) => {
    var data = await product.findById(req.params.id);
        res.status(200).json({
            message: "data",
            data
        })
}