// sign up logic 

const userModel = require('../models/user');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');




const signup = async (req ,res)=>{
    try{
       const {name, email, password} =req.body;
       console.log("Request received:", req.body);
       const user = await userModel.findOne({email});
       // checking is user existed then login ,not signup
       if(user){
        return res.status(409).json({
            message:"user already existed -- login please ",
            success:false
        });
       }

   
       // if user not existed then add new user....
       const newUser =new userModel({name,email,password});
       newUser.password = await bcrypt.hash(password, 10);
       await newUser.save();
       res.status(201).json({
        message:"SignUp Successfully ",
        success: true
       })

    }
    catch(error){
        console.log(error);

    }

}

// login logic----
const login = async (req ,res)=>{
    try{
       const { email, password} =req.body;
       console.log("Request received:", req.body); //debugging lyi
       const user = await userModel.findOne({email});
     
       const jwtToken = jwt.sign(
        {email:user.email, _id: user._id},
        process.env.JWT_SECRET,
        {expiresIn :'24h'}
    )
console.log(jwtToken)

       res.status(200).json({
        message:"Login Successfully ",
        success: true,
        jwtToken,
        email,
        name: user.name
       })

    }
    catch(error){
        console.log(error);

    }

}




module.exports= {
    signup, login
};