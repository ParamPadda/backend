// server side validation

const Joi =require('joi');
const jwt= require("jsonwebtoken");


//middleware for server side validation for signup
const signupvalidation =(req,res,next)=>{
    console.log("🔍 Received body:", req.body); // Debugging log 

    const schema = Joi.object({
        //client side toh req aye gi in the form of name, email,password
        name: Joi.string().min(3).max(100).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    })

    const {error , value} =schema.validate(req.body);
    if(error){
        console.log(error);
        return res.status(400).json({
            message:'Bad request', error
        })
    }
    next();
    console.log("✅ After Validation req.body:", value); // Debugging
}
const loginvalidation =(req,res,next)=>{
    const schema = Joi.object({
        //client side toh req aye gi in the form of name, email,password
        
        email: Joi.string().email().required(),
        password: Joi.string().min(4).max(100).required(),
    })

    const {error} =schema.validate(req.body);
    if(error){
        return res.status(400).json({
            message:'Bad request', error
        })
    }
    //token verify
    try{
        // const token= req.headers.authorization;
        // Extract token by removing "Bearer "
        const authHeader = req.headers.authorization;
const token = authHeader.split(" ")[1];

        console.log(token);
        const decoded =jwt.verify(token,process.env.JWT_SECRET);
        console.log(decoded);
    }
    catch(error){
        console.log(error);}
    next();
   

}

module.exports = {
    signupvalidation,
    loginvalidation
}