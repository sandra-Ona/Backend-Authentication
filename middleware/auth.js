const { response } = require('express');
const jwt = require('jsonwebtoken');
const users = require('../model/user')
//checks the token and make sure it is verified before it nexts

const requiredAuthProcess = (req, res, next) => {
//get access to the cookie
const token = req.cookies.jwt;
if (token){
    jwt.verify(token, process.env.JWT_SECRET,async (err, decodedToken)=>{
        if (err){
            res.redirect('/login');
        }else {
            const user = await users.findById(decodedToken.id)
            res.locals.email= user.email;
            next();
        }
    });
} else {
    res.redirect('/login')
}};

module.exports= requiredAuthProcess