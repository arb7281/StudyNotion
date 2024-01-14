const { Mongoose } = require("mongoose");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");

const bcrypt = require("bcrypt");
const crypto = require("crypto");

//resetPasswordToken mail send krne ke liye aur reset bhi idhr hoga
exports.resetPasswordToken = async (req, res) => {
    try{
        //get email from req body
    const email = req.body.email;
    console.log(email)
    //check if email present or not
    const user = await User.findOne({email: email});
    if(!user){
        return res.json({
            success: false,
            message:'Your Email is not registered with us'
        })
    }
    //generate token isase random id generate hogi jo apn token ke liye istemal krkenge
    const token = crypto.randomUUID();
    //update user by adding token and expiration time email ke basis pe dhundo aur values update kr do
    const updatedDetails = await User.findOneAndUpdate({email:email},
                                                        {
                                                            token:token,
                                                            resetPasswordExpires: Date.now() + 5*60*1000,
                                                        }, {new:true})
    //create url is url ki link user ke mail pr jayegi
    const url = `http://localhost:3000/update-password/${token}`
    //send mail containing the url
    await mailSender(email, 'Password Reset Link',
                    `PasswordReset Link: ${url}`);
    //return response
    return res.json({
                    success:true,
                    message:'Email sent Successfully, please check email and change password'
    })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message:"Something went wrong while rgenerating token"
        })
       }
    
}


//resetPassword aur db me entry krne ke liye user jab upr ke link pr click krega uske liye password reset krne ki option khulegi
exports.resetPassword = async (req,res) => {
  try{
      //data fetch
      const {password, confirmPassword, token} = req.body; //token front end ne useSearch params ki madad se body me bhej diya wo 
      //jo upr link apn ne create kri token bana kr uskeo open krkne ke bad apn ko reset password ke liye inputs dikhenge
      //validation
      if(password !== confirmPassword){
          return res.json({
              success: false,
              message:'Password not matching'
          })
      }
      //get user details from db
      const userDetails = await User.findOne({token: token});
  
      //if no entry - invalid token
      if(!userDetails){
          return res.json({
              success: false,
              message:'Token is not valid'
          })
      }
      //token time check kro yane expire hua he ki ni
      if(!(userDetails.resetPasswordExpires > Date.now())){
          return res.json({
              success: false,
              message:'token is expired, please regenerate yopur token'
          })
      }
      //hash Password
      const hashedPassword = await bcrypt.hash(password, 10);
  
      //password ko update kr do
      await User.findOneAndUpdate({token:token}, 
                                  {password:hashedPassword},
                                  {new:true})
      //retuyrn response
      res.status(200).json({
          success: true,
          message:'Password reset successful'
      })
  }catch(error){
    console.log(error);
    return res.status(500).json({
        success: false,
        message:"Something went wrong while reseting password"
    })
   }
}