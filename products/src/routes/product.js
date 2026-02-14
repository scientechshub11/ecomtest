const express =require('express');
const router = express.Router(); 
const productController = require('../controller/product');
let productControllerObj = new productController()

router.get('/product', async(req, res)=>{
    let product = await productControllerObj.getProducts();
    res.json({
        product,
        status:200,
        message:"testig product with this api url"
    })
})
module.exports = router;