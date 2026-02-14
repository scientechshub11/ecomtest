const express = require('express');
const router = express.Router();
const uploadcontroller = require('../controller/upload.controller');




router.get('/upload-url', async(req, res)=>{
    let filedetails = await uploadcontroller(req, res)
    res.json({
        message:"s3 is working!",
        filedetails
    })
})



module.exports = router;