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
}
