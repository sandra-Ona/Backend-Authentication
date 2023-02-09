const Users = require('../model/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const handleErrors= require('../middleware/handleErrors')

//header, payload-id, signature, option key
const generateToken= (id) =>{
    return jwt.sign({id}, process.env.JWT_SECRET, {expiresIn: "3d" })
}


const getregisterpage= (req,res) =>{
    res.render('signup')
}

const getloginpage= (req,res) =>{
    res.render('login')
}

const getdashboardpage= (req,res) =>{
    res.render('dashBoard')
}
const logout= (req,res) =>{
    res.cookie('jwt', ' ', {maxAge:1000})
    res.redirect('/login')
}


const register = async (req, res) => {
    const {email, password} = req.body;
    try {
        //protect user info
        //create user on the database
        const user =await Users.create({email, password});
        res.status(201).json({ success:true, data:user})

    }catch (error){
         //handle errors in the catch block
        const errors= handleErrors(error);
        res.status(400).json({errors})
    }

}



const login = async (req, res) => {
   const {email, password} = req.body
   try{
    if (!email || !password) {
        return res.status(400).json({success:false, message: 'please provide necessary information'})}
   //email is registered
   const user= await Users.findOne({ email});
if (user){
   const authenticated = await bcrypt.compare(password, user.password);
   if (authenticated){
    const token = generateToken(user._id);
    const time = 3*24*60*60*1000;
    res.cookie('jwt', token, {maxAge: time});
    return res.status(200).json({success:true, data:user})
   } throw Error ('Invalid email or password')
}
throw Error ('User not registerd yet')
    } catch (error){
        const errors= handleErrors(error);
        res.status(400).json({errors})
   }
}

module.exports ={register, login, getregisterpage, getloginpage, getdashboardpage, logout}