const port = 4000;
const express = require('express')
const app = express();
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const multer = require("multer")
const path = require("path")
const cors = require("cors");
const { log } = require('console');
const Stripe = require('stripe')
const stripe = Stripe('sk_test_51PNxEB1XzIPCkFeylgf0aXgO3u7hlMMN1i5uaElkTAi8OeVsWZJdVxZnKbJWSl2M0c7Vtb9HSBpWdLZlK0KkFoGO00PUEBQL0F')
const bodyParser = require('body-parser');

app.use(express.json())
app.use(cors())

//Database Connection with Mongo

mongoose.connect("mongodb+srv://mussiet:GGNZ0UVfKwnoTfyq@cluster0.cmdc596.mongodb.net/e-commerce")

// API creation

app.get("/",(req,res)=>{
    res.send("Express App is running")
})
//Stripe integration
app.post('/create-checkout-session',async(req,res)=>{
    const {amount} = req.body

    const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Total Cart Amount',
              },
              unit_amount: amount * 100,
            },
            quantity: 1,
          },
        ],
        mode: 'payment',
        success_url: 'http://localhost:5173/success',
        cancel_url: 'http://localhost:5173/cancel',
    })
    res.json({id:session.id})
})

// Image storage Engine

const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

//creating upload endpoint for images
app.use('/images',express.static('upload/images'))

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating products

const Product = mongoose.model("Product",{
    id:{
        type:Number,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    image:{
        type:String,
        required:true,
    },
    category:{
        type:String,
        required:true,
    },
    new_price:{
        type:Number,
        required:true,
    },
    old_price:{
        type:Number,
        required:true,
    },
    date:{
        type:Date,
        default:Date.now,
    },
    available:{
        type:Boolean,
        default:true,
    }
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({})
    let id;
    if(products.length>0){
        let last_product_array = products.slice(-1)
        let last_product = last_product_array[0]
        id = last_product.id+1
    }else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        image:req.body.image,
        category:req.body.category,
        new_price:req.body.new_price,
        old_price:req.body.old_price,
    })
    console.log(product)
    await product.save()
    console.log("saved")
    res.json({
        success:true,
        name:req.body.name,
    })
})
//creating API for deleting product

app.post('/removeproduct',async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id})
    console.log("removed")
    res.json({
        success:true,
        name:req.body.name,
    })
})
//creating API for editing a product
app.post('/editproduct', async (req, res) => {
    const { id, name, old_price, new_price, category } = req.body;
    try {
      await Product.findOneAndUpdate(
        { id: id },
        { name, old_price, new_price, category },
        { new: true }
      );
      res.status(200).send('Product updated');
    } catch (err) {
      console.error(err);
      res.status(500).send('Server error');
    }
  });
//Creating API for getting all products

app.get('/allproducts',async (req,res)=>{
    let products = await Product.find({})
    console.log("All Products Fetched")
    res.send(products)
})

//schema creating for user model

const Users = mongoose.model('Users',{
    name:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    password:{
        type:String,
    },
    cartData:{
        type:Object
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for registring the user

app.post('/signup',async (req,res)=>{

    let check = await Users.findOne({email:req.body.email})
    if(check){
        return res.status(400).json({success:false,errors:"existing user found with the same email id"})
    }
    let cart = {}
    for(let i = 0;i<300;i++){
        cart[i] = 0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart
    })
    await user.save()

    const data = {
        user:{
            id:user.id,
        }
    }
    const token = jwt.sign(data,'secret_ecom')
    res.json({success:true,token})
})


//creating endpoint for user login
app.post('/login',async (req,res)=>{
    let user = await Users.findOne({email:req.body.email})
    if (user) {
        const passCompare = req.body.password === user.password;
        if(passCompare){
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,'secret_ecom')
            res.json({success:true,token})
        }
        else{
            res.json({success:false, errors:"wrong password"})
        }
    }else{
        res.json({success:false,errors:"wrong email id"})
    }
})

// creating endpoint fot new collection data
app.get('/newcollection', async (req, res) => {
    let products = await Product.find({});
    let condition = products.length<=8?true:false;
    let newcollection = condition?products:products.slice(1).slice(-8)
    console.log("new collection fetched");
    res.send(newcollection)
  
});

//creating endpoint for popular in women section
app.get('/popularinwomen', async(req,res)=>{
    let products = await Product.find({category:"women"});
    let popular_in_woman = products.slice(0,4)
    console.log("Popular in woman fetched")
    res.send(popular_in_woman)
})

//creating a middleware to fetch user

const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token')
    if(!token){
        res.status(401).send({errors:"Please authenticate using valid token"})
    }else{
        try {
            const data = jwt.verify(token,'secret_ecom')
            req.user = data.user
            next()
        } catch (error) {
            res.status(401).send({errors:"Please authenticate using a valid token"})
        }
    }
}

//creating endpoint for cartdata
app.post('/addtocart',fetchUser,async(req,res)=>{
    console.log("added",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    userData.cartData[req.body.itemId] += 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Added")
})

//creating endpoint to remove product from cartdata
app.post('/removefromcart',fetchUser,async(req,res)=>{
    console.log("removed",req.body.itemId)
    let userData = await Users.findOne({_id:req.user.id})
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData})
    res.send("Removed")
})

//creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Get cart")
    let userData = await Users.findOne({_id:req.user.id})
    res.json(userData.cartData)
})
app.listen(port,(error)=>{
    if(!error){
        console.log('Server running on port '+port)
    }
    else{
        console.log("Error: "+error)
    }
})