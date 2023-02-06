require("dotenv").config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const PORT= 7000;
mongoose.set("strictQuery", true);
const notFound = require('./middleware/notfound');
const userRouter = require('./routes/userRouter');

//middleware
app.use(express.json());

//routes
app.use(userRouter);

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