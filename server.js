const express = require('express')
const mongoose = require('mongoose');
const Product = require('./models/product_model')
const app = express()
app.use(express.json())

app.get('/',  (req, res) => {
  res.send('Hello World')
})

app.get('/blog',  (req, res) => {
  res.send('Hello World blog')
})

app.post('/product',async  (req, res) => {
  try{

    const product = await Product.create(req.body)
    res.status(200).json(product)

  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})

app.get('/products',async (req,res)=>{
  try{
     const products = await Product.find({})
     res.status(200).json(products);

  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})


app.get('/products/:id',async (req,res)=>{
  try{
    const {id} = req.params;
     const product = await Product.findById(id);
     res.status(200).json(product);
     
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})


///update
app.put('/products/:id',async (req,res)=>{
  try{
    const {id} = req.params;
     const product = await Product.findByIdAndUpdate(id,req.body);
     if(!product){
      res.status(404).json({message: `There is no such product with id ${id}`});
     }
     const updateProduct = await Product.findById(id);
     res.status(200).json(updateProduct);
     
  }catch(error){
    console.log(error.message);
    res.status(500).json({message: error.message});
  }
})


///delete crud
app.delete('/products/:id',async (req,res)=>{
  try{
    const {id} = req.params;
     const product = await Product.findByIdAndDelete(id);

     // If product not found
     if (!product) {
       return res.status(404).json({ message: `Product with id ${id} not found` });
     }
 
     // If product deleted successfully
     res.status(200).json({ status: true, message: 'Product deleted successfully' });
   } catch (error) {
     console.error(error.message);
     res.status(500).json({ message: `Internal Server Error ${error.message}` });
   }
})


mongoose.connect('mongodb+srv://admin:admin@cluster0.ncwxo0d.mongodb.net/Node-Api').then(()=>{
  console.log("Connected to MongoDB")

  app.listen(3000,()=>{
    console.log("Server is running on port 3000");
})

}).catch((error)=>{
  console.log(error)
})