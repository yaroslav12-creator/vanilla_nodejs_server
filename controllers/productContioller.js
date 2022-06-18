const Product = require('../models/productModel');
const { getPostData } = require('../utils');

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

// @route POST /api/product
async function createProduct(req, res) {
    try {
        let body = await getPostData(req);

        const {title, description, price} = JSON.parse(body);   
        
        const product = {
            title,
            description, 
            price,
        };

        const newProduct = await Product.create(product);

        res.writeHead(201, { 'Content-type': 'application/json' })
        return res.end(JSON.stringify(newProduct));  
    } catch (error) {
        console.log(error);
    }   
}

// @route PUT /api/pruduct/:id
async function updateProduct(req, res, id) {
    try {
        const product = await Product.findById(id);
        
        if(!product) {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'product not found' }));
        }
        else {
            let body = await getPostData(req);

            const {title, description, price} = JSON.parse(body);   
            
            const newProduct = {
                title: title || product.title,
                description: description || product.description, 
                price: price || product.price,
            };
    
            const updatedProduct = await Product.update(id, newProduct);
    
            res.writeHead(200, { 'Content-type': 'application/json' })
            return res.end(JSON.stringify(updatedProduct));  
        }
    } catch (error) {
        console.log(error);
    }   
}

async function removeProduct(req, res, id) {
    try {
        let product = await Product.findById(id)

        if(product) {
            product = await Product.remove(id);
            res.writeHead(200, { 'Content-type': 'application/json' });
            res.end(JSON.stringify(product)); 
        } else {
            res.writeHead(404, { 'Content-type': 'application/json' });
            res.end(JSON.stringify({ message: 'product not found' }));
        }
    } catch (error) {
        console.log(error);
    }
}

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    removeProduct,
}