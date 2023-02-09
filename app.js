require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT= 7000;
mongoose.set("strictQuery", true);
const notFound = require('./middleware/notfound');
const newRouter = require('./routes/newUserRouter')
const cookieparser = require('cookie-parser');
// const userRouter = require('./routes/userRouter');



app.set("view engine", "ejs");

//middleware
app.use(express.json());

app.use(express.urlencoded ({extended: true}));
app.use (cookieparser());

//routes
// app.use(userRouter);
app.use(newRouter);

//set cookies
app.get('/example', (req, res) => {
    res.cookie ('isAdmin', true)
    res.cookie ('another', false, {
        //calculating in millistone
        maxAge: 24*60*60*1000, 
        secure:true,
        httpOnly: true}) 


    res.send('cookies set')
})

app.get ('/get', (req, res) => {
    // const cookies= req.cookies
    // const {isAdmin} = cookies;
    const isAdmin= req.cookies.isAdmin
    res.json (cookies);
});


//error route
app.use(notFound);

const start= async() =>{
    try{
        await mongoose.connect(process.env.MONGO_URL);
        app.listen (PORT, () =>{
            console.log(`server running on port ${PORT}...`);
        })
    } catch (error) {
        console.log(error);
    }

};

start();

