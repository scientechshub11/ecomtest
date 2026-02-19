const express =require('express');
const router = express.Router(); 
const productController = require('../controller/product');
let productControllerObj = new productController()
const sendToQueue = require("../services/sqsProducer");
router.get('/product', async(req, res)=>{
    let product = await productControllerObj.getProducts();
    res.json({
        product,
        status:200,
        message:"testig product with this api url"
    });
})
router.post("/product", async (req, res) => {
  try {
    const { description, price, category, imageUrl } = req.body;
    console.log(req.body)
    if (!description || !price || !category || !imageUrl) {
      return res.status(400).json({ error: "description, price, category, imageUrl required" });
    }
    let image_url = imageUrl
    let product = await productControllerObj.createProduct(description, price, category, image_url);

    res.json(product);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create product" });
  }
});

router.post("/order", async (req, res) => {
  try {
    await sendToQueue({
      orderId: Date.now(),
      userId: 101,
      task: "PROCESS_ORDER",
    });

    res.json({ message: "Order queued successfully" });
  } catch (err) {
    console.error("SQS error:", err);
    res.status(500).json({ error: "Failed to queue job" });
  }
});


module.exports = router;