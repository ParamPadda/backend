//nodemailer :-
 nodemailer = require('nodemailer');
async function sendVarifyMail(to_email ,otp)
{
let transporter = nodemailer.createTransport({
    service:"gmail",
    host:"smtp.gmail.com",
    port:465,
    secure:true,
    auth :{
        user:"parampadda936@gmail.com",
       
        pass:"qjrarbpydnamqukn"
    }
});


let info = await transporter.sendMail({
    to:to_email,
    from:"parampadda936@gmail.com",
    subject:"Your OTP for Junior Creator Website",
    // html: `<p>Your OTP is:6765</p>`
     text: `Your OTP is ${otp}`
    

});
if(info.messageId)
return true;
else
return false;
}
module.exports=sendVarifyMail;