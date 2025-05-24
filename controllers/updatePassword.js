const userModel = require('../models/user');
const bcrypt = require('bcrypt');

const updatePassword =async(req,res)=>{
    const {email ,newPassword}=req.body;
    try{
        const user =await userModel.findOne({email});
        if(!user){
            return res.status(404).json({ message: "User not found" });
        }

        const hashedPassword= await  bcrypt.hash(newPassword,10);
        user.password = hashedPassword;
        await user.save();

        res.json({success:true ,message:'Password updated successfully'})
    }
    catch(err){
        console.error(err);
        res.status(500).json({message:'Server error'})
    }
}

module.exports={updatePassword};