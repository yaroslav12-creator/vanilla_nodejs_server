const Product = require('../models/productModel');


// @route GET /api/pruducts
async function getProducts(req, res) {
    try {
        const products = await Product.findAll();

        res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(products)); 
    } catch(error) {
        console.log(error)
    }
}

// @route GET /api/pruduct/:id
async function getProductById(req, res, id) {
    try {
        const product = await Product.findById(id)

        if(product) {
            res.writeHead(200, { 'Content-type': 'application/json' });
        res.end(JSON.stringify(product)); 
        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'product not found' }));
        }

    } catch(error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductById,
}