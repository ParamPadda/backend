const mongoose =require("mongoose");

const adminSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true
    },
    email: { type: String, unique: true, required:true },
    password: {
        type:String,
        required:true
    },
    role: { type: String, enum: ['User', 'Parents', 'Trainer'], default: 'User',required:true },
  });
  
  const adminModel= mongoose.model("admins",adminSchema);
  module.exports= adminModel;