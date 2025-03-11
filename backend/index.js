const express = require("express");
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
let dotenv = require('dotenv' ).config({path:'.env'});
// This is your test secret API key.
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);


const app = express();
const port = process.env.PORT || 4000;

app.use(express.static("public"));
app.use(express.json());
app.use(cors());

app.use(express.static("./frontend/build"));
app.get("*", (req,res)=>{
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"))
})

// Database connection with MongoDB
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then(()=>{
    console.log("connexion successful");   
})
.catch((error)=>console.log(error));



                // API creation
app.get("/", (req, res)=>{
    res.send("Express APP is Running")
})

// Image Storage Engine
const storage = multer.diskStorage({
    destination: './upload/images',
    filename: (req,file,cb)=>{
        return cb(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
})

const upload = multer({storage:storage})

// Creating upload endpoint for images
app.use("/images",express.static(path.join(__dirname,'upload/images')));

app.post("/upload",upload.single('product'),(req,res)=>{
    res.json({
        success:1,
        image_url:`http://localhost:${port}/images/${req.file.filename}`
    })
})

// Schema for creating product
const Product = mongoose.model("Product",{
    id:{
        type: Number,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    image:{
        type: String,
        required: true,
    },
    category:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
    },
    date:{
        type: Date,
        default: Date.now,
    },
    available:{
        type: Boolean,
        default: true,
    }
})

app.post('/addproduct',async (req,res)=>{
    let products = await Product.find({});
    let id;
    if(products.length>0)
    {
        let last_product_array = products.slice(-1);
        let last_product = last_product_array[0];
        id = last_product.id+1;
    }
    else{
        id=1;
    }
    const product = new Product({
        id:id,
        name:req.body.name,
        category:req.body.category,
        price:req.body.price,
        image:req.body.image,
    })
    console.log(product);
    await product.save();
    console.log("Saved");
    res.json({
        success: true,
        name:req.body.name,
    })    
})

// Creating API for deleting products
app.post('/removeproduct', async (req,res)=>{
    await Product.findOneAndDelete({id:req.body.id});
    console.log("Removed");
    res.json({
        success:true,
        name:req.body.name
    })
    
})

// Creating a API for getting all products
app.get('/allproducts', async (req, res) => {
    console.log(res);
    try {
        let products = await Product.find({});
        console.log('All Products Fetched');
        res.status(200).json({
            success: true,
            data: products,
        });
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ success: false, message: 'Unable to fetch products' });
    }
});


// Schema creating User model
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
        type:Object,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for registering the user
app.post('/signup',async(req,res)=>{
    let check = await Users.findOne({email:req.body.email});
    if (check) {
        return res.status(400).json({success:false,errors:"existing user found with the same email address"})
    }
    let cart = {};
    for (let i = 0; i < 300; i++) {
        cart[i]=0;
    }
    const user = new Users({
        name:req.body.username,
        email:req.body.email,
        password:req.body.password,
        cartData:cart,
    })
    await user.save();

    const data = {
        user:{
            id:user.id
        }
    }

    const token = jwt.sign(data, 'secret_ecom');
    res.json({success:true,token})
})


// Creating endpoint for user login
app.post('/login', async(req,res)=>{
    let user = await Users.findOne({email:req.body.email});
    if(user) {
        const passCompare = req.body.password === user.password;
        if(passCompare) {
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data, 'secret_ecom');
            res.json({success:true,token});
        }
        else {
            res.json({success:false,errors:"Wrong Password"})
        }
    }
    else {
        res.json({success:false, errors:"Wrong Email Id"})
    }
})

// Creating endpoint for newcollection data
app.get('/newcollections', async(req,res)=>{
    let products = await Product.find({});
    let newcollection = products.slice(1).slice(-8);
    console.log("NewCollection Fetched");
    res.send(newcollection);
})



// Creating endpoint for Popular section
app.get('/mostpopular', async(req,res)=>{
    let products = await Product.find({category:"clothes"});
    let popular = products.slice(0,4);
    console.log("Most Popular Fetched");
    res.send(popular);
})


// Creating endpoint for Related products section
app.get('/relatedproducts', async(req,res)=>{
    let products = await Product.find({});
    let related_products = products.slice(8,12);
    console.log("Related Products Fetched");
    res.send(related_products);
})


// Creating middleware to fetch user
const fetchUser = async (req,res,next)=>{
    const token = req.header('auth-token');
    if (!token){
        res.status(401).send({errors:"Please authenticat using valid token"})
    }
    else {
        try{
            const data = jwt.verify(token,'secret_ecom');
            req.user = data.user;
            next();
        } catch(error){
            res.status(401).send({errors:"Please authenticate using valid token"})
        }
    }
}

// Creating endpoint for adding products in cartdata
app.post('/addtocart',fetchUser, async(req,res)=>{
    console.log("added",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    userData.cartData[req.body.itemId] += 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Added");
    
})


// Creating endpoint for remove products in cartdata
app.post('/removefromcart', fetchUser, async(req,res)=>{
    console.log("removed",req.body.itemId);
    let userData = await Users.findOne({_id:req.user.id});
    if(userData.cartData[req.body.itemId]>0)
    userData.cartData[req.body.itemId] -= 1;
    await Users.findOneAndUpdate({_id:req.user.id},{cartData:userData.cartData});
    res.send("Removed");
})


// Creating endpoint to get cartdata
app.post('/getcart',fetchUser,async(req,res)=>{
    console.log("Get Cart");
    let userData = await Users.findOne({_id:req.user.id});
    res.json(userData.cartData);
    
})

// Endpoint for make payment
app.post("/makepayment", async (req, res) => {
    try {
        console.log("Received payment request:", req.body);

        const cartItems = req.body;
        if (!cartItems || cartItems.length === 0) {
            return res.status(400).json({ error: "Cart is empty" });
        }

        const lineItems = cartItems.map((item) => ({
            price_data: {
                currency: "xof",
                product_data: {
                    name: item.name,
                    images: [item.image],
                },
                unit_amount: item.price, 
            },
            quantity: item.quantity,
        }));

        console.log("Stripe Line Items:", lineItems);

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: "http://localhost:3000/success",
            cancel_url: "http://localhost:3000/cancel",
        });

        res.json({ id: session.id });

    } catch (error) {
        console.error("Error creating Stripe session:", error);
        res.status(500).json({ error: "Failed to create session" });
    }
});


// Schema creating delivery model
const Delivery = mongoose.model('Delivery',{
    firstname:{
        type:String,
    },
    lastname:{
        type:String,
    },
    email:{
        type:String,
        unique:true,
    },
    street:{
        type:String,
    },
    city:{
        type:String,
    },
    state:{
        type:String,
    },
    zipcode:{
        type:Number,
    },
    country:{
        type:String,
    },
    phone:{
        type:Number,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for delivery information
app.post("/deliveryinformation",async(req,resp)=>{
    const delivery = new Delivery({
        firstname:req.body.firstname,
        lastname:req.body.lastname,
        email:req.body.email,
        street:req.body.street,
        city:req.body.city,
        state:req.body.state,
        zipCode:req.body.zipCode,
        country:req.body.country,
        phone:req.body.phone
    })
    await delivery.save();
})

// Schema creating newsletter model
const Newsletter = mongoose.model('Newsletter',{
    email:{
        type:String,
        unique:true,
    },
    date:{
        type:Date,
        default:Date.now,
    }
})

// Creating endpoint for newsletter
app.post("/newsletter", async(req,res)=>{
    const newsletter = new Newsletter({
        email:req.body.email
    })
    await newsletter.save();
})


app.listen(port, (error)=>{
    if(!error){
        console.log("Server Running on Port: "+port)
    }
    else
    {
        console.log("Error: "+error)
    }
})