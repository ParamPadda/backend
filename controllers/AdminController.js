const adminModel = require('../models/admin');
const bcrypt =require('bcrypt');
const jwt= require('jsonwebtoken');




const register = async (req ,res)=>{
    try{
       const {name, email,role, password} =req.body;
       console.log("Request received:", req.body);
       const admin = await adminModel.findOne({email});
       // checking is admin existed then login ,not signup
       if(admin){
        return res.status(409).json({
            message:"admin already existed ",
            success:false
        });
       }

   
       // if admin not existed then add new user....
       const newAdmin =new adminModel({name,email,role,password});
       newAdmin.password = await bcrypt.hash(password, 10);
       await newAdmin.save();
       res.status(201).json({
        message:"Admin register Successfully ",
        success: true
       })

    }
    catch(error){
        console.log(error);

    }

}


module.exports={register} ;

// qjra rbpy dnam qukn