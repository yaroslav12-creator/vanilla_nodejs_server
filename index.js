const http = require('http');
const { 
    getProducts, 
    getProductById, 
    createProduct, 
    updateProduct, 
    removeProduct,
} = require('./controllers/productContioller');

const server = http.createServer((req, res) => {
    if(req.url === '/api/products' && req.method === 'GET') {
        getProducts(req, res);
    } 
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'GET') {
        const id = req.url.split('/')[3];

        getProductById(req, res, id);
    } 
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'PUT') {
        const id = req.url.split('/')[3];

        updateProduct(req, res, id);
    } 
    else if(req.url.match(/\/api\/products\/\w+/) && req.method === 'DELETE') {
        const id = req.url.split('/')[3];

        removeProduct(req, res, id);
    } 
    else if(req.url === '/api/products' && req.method === 'POST') {
        createProduct(req, res);
    } 
    else {
        res.writeHead(404, { 'Content-type': 'text/html' });
        res.end('<h1>Not found</h1>');
    }
});

const PORT = process.env.PORT || 5000; 


server.listen(PORT, () => {
    console.log(`Server is listening on port: ${PORT}`);
});
