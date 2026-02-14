const express = require('express');
const app = express();
const productRouter = require('./routes/product');
const uploadRoutes = require('./routes/upload.route')
require('dotenv').config();
const { sequelize } = require("./config/db");

const port = process.env.PORT||7071;


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

(async function initDB() {
  try {
    await sequelize.authenticate();
    await sequelize.sync()
    console.log("DB connected");
  } catch (err) {
    console.error("DB connection failed", err);
  }
})();




app.get('/api/testproduct', async(req, res)=>{
    res.json({
        status:200,
        message:"testig product with this api url"
    })
})
app.use('/api',productRouter)
app.use("/api", uploadRoutes);
app.listen(port, ()=>{
    console.log(`app listen to the port:${port}`)
});