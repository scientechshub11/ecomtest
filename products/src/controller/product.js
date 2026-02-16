const productJson = require('./product.json');
const db = require('../config/db');

module.exports = class{
    constructor(){
        this.db = db;
        this.product = productJson;
        this.productModel = this.db.Product;
    }
    async getProducts(){
        let productdata = this.product;
        let productDb = await this.productModel.findAll({})
        return {productdata, productDb};
    }
    async createProduct(description, price, category, image_url){
        console.log("hi from controller")
        try{
        let productObject = {
            description:description, 
            price:price, 
            category:category,
            image_url:image_url
        }
        let productdetails = await this.productModel.create(productObject);
        if(!productdetails){
            productdetails = {
                "product":"not created!"
            }
        }
        console.log(productdetails,"=====>productdetails")
        return productdetails;
    }
    catch(err){
        console.log(err,"===>err")
    }
    }
}
