const express = require('express');
const router = express.Router();
const Otp = require('../../models/otp');
const userModel = require('../../models/user');  


const sendVarifyMail = require('../../mailsend');

function generateOTP() {
    return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit
  }


router.post('/send-verification', async (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ success: false, message: 'Email is required' });
    }
   
    try {
        const userExist = await userModel.findOne({email});
        if(!userExist){
            return res.status(409).json({
                message:"Not a registered email ",
                success:false
            });
        }
        const otp =generateOTP();
        await Otp.create({ email, otp });
        const sent = await sendVarifyMail(email ,otp);
        if (sent) {
            return res.status(200).json({ success: true, message: 'OTP sent successfully.' });
        } else {
            return res.status(500).json({ success: false, message: 'Failed to send OTP.' });
        }
    
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
});
// POST /api/email/verify-otp
router.post('/verify-otp', async (req, res) => {
    const { otp ,email} = req.body;
    console.log(" OTP verification request received:", req.body);

  
    if (!otp || !email) {
      return res.status(400).json({ success: false, message: ' OTP and email are required' });
    }
  
    try {
      const otpRecord = await Otp.findOne({ email, otp });
  
      if (!otpRecord) {
        return res.status(400).json({ success: false, message: 'Invalid OTP or email' });
      }
  
      // Optional: Delete the OTP after successful verification to prevent reuse
      await Otp.deleteOne({ _id: otpRecord._id });
  
      return res.status(200).json({ success: true, message: 'OTP verified successfully' });
    } catch (error) {
      return res.status(500).json({ success: false, message: error.message });
    }
  });
  

module.exports = router;
