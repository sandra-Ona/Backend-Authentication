const User= require('../model/user')
const bcrypt= require('bcrypt')
//error handling
//intergrate views
//authentication -json web token

const register= async (req, res) => {
    //make sure they provide email and password
    
    
   
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({success:false, message: 'please provide necessary information'})
      }
      //email has not been registered
      const userExist= await User.findOne({email})
      if (userExist) {
        return res.status(400).json({success:false, message: 'Email has been used'})
      }
      //protect user information------hashing algorithm------
       const salt= await bcrypt.genSalt();
       const hashedPassword= await bcrypt.hash (password, salt);

       //create the user
      try{
        const user= await User.create({email, password: hashedPassword});
        res.status(201).json({success:true,data:user })
      } catch (error) {
        console.log (error)
        res.status(500).json({msg:error})
      }
};







const login= async (req, res) => {
      //email and password
    const {email, password} = req.body
    if (!email || !password) {
        return res.status(400).json({success:false, message: 'please provide necessary information'})
      }
  
    //user has registered
    const user= await User.findOne ({email})
    if (!user) {
       return res.status(404).json({success:false, message: 'Email not found, Please go and register'})
    }

    //provide the correct details, email and password
    const authenticated = user.email === email && (await bcrypt.compare(password, user.password))
    if  (authenticated) {
        user.password = " "
       return res.status(200).json({success:true, data: user})
    } else {
        return res.status(401).json({success:false, message: 'Invalid email or password'})
    }
};





module.exports = {register, login }