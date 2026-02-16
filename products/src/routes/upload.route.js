const express = require('express');
const router = express.Router();
const uploadcontroller = require('../controller/upload.controller');




router.get('/upload-url', uploadcontroller)



module.exports = router;