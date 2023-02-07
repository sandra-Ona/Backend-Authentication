const Users = require('../model/user');
const bcrypt = require('bcrypt');
const handleErrors = (err) =>{
//err messages, error code e.g 11000: duplicate message
let errors = { email:"", password:""}
if (err.code === 11000){
    errors.email = 'Email is already in use';
    return errors;
} 
if (err.message=== 'User not registerd yet'){
    errors.email='This email has not been registered';
    return errors;
}
if (err.message=== 'Invalid email or password'){
    errors.email='Invalid email or password';
    errors.password= 'Invalid email or password';
    return errors;
}
if (err.message.includes ('User validation failed')){
    Object.values(err.errors).forEach(({properties}) =>{
        errors[properties.path]= properties.message;
    });
}
return errors;
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
    return res.status(200).json({success:true, data:user})
   } throw Error ('Invalid email or password')
}
throw Error ('User not registerd yet')
    } catch (error){
        const errors= handleErrors(error);
        res.status(400).json({errors})
   }
}

module.exports ={register, login, getregisterpage, getloginpage, getdashboardpage}