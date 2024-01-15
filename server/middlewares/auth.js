//middlewares for to check if the user is authorized or  us user ne already register kiya he to usko dobara sign in na krna pade 
const jwt = require("jsonwebtoken");
require("dotenv").config();
const User = require("../models/User");
const bcrypt = require("bcrypt")


//auth
exports.auth = async (req, res, next) => {
    try{
        //extract token
        console.log("I am inside auth middleware")
        const token = req.cookies.token || req.body.token ||  req.header("Authorization").replace("Bearer ","");
        console.log("printing token",token);

        if(!token) {
            return res.status(401).json({
                success: false,
                messgae:"Token is missing"
            });
        }

        
        //verify the token by decoding
        try{
            const decode = jwt.verify(token, process.env.JWT_SECRET);
            // console.log(decode);
            req.user = decode;//user banake save kr lega isme payload hoga jo apn ne jwt bnate time save kiya tha
        }
        catch(error){
            return res.status(401).json({
                success:false,
                message:error.message,
            })
        }
        next();
    }
    catch (error){
        return res.status(401).json({
            success:false,
            message:'Something went wrong while validating the token'
        })
    }
    
}



//isStudent
exports.isStudent = async (req, res, next) => {
    try{
        //chjeck if the user student or not
          if(req.user.accountType !== "Student")
          {
            return res.status(401).json({
                success: false,
                message:'This is a protected route for Students only'
            })
          }
          next()
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
    
}



//isInstructor
exports.isInstructor = async (req, res, next) => {
    try{
        //check if user instructor or not
          if(req.user.accountType !== "Instructor")
          {
            return res.status(401).json({
                success: false,
                message:'This is a protected route for Instructors only'
            })
          }
          next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}



//isAdmin
exports.isAdmin = async (req, res, next) => {
    try{
        //check if user Admin or not
          if(req.user.accountType !== "Admin")
          {
            return res.status(401).json({
                success: false,
                message:'This is a protected route for Admin only'
            })
          }
          next();
    }catch(error){
        return res.status(500).json({
            success:false,
            message:'User role cannot be verified, please try again'
        })
    }
}



//checkPassword
exports.checkPassword = async (req, res, next) => {
    try {
      //get data from req body
      const userDetails = await User.findById(req.user.id);
      //get oldPassword, newPassword, confirmPassword
      const  {password}  = req.body;
      console.log("printing received password from front end", password);
      //validation on the above data
      //check if old password and user current password is matched
      const isPasswordMatch = await bcrypt.compare(
        password,
        userDetails.password
      );
      
      //check if passwords matched or not
      if (!isPasswordMatch) {
        //if old password doesn't match return a 401 unauthorized error
        return res.status(401).json({
          success: false,
          message: "The password is incorrect",
        });
      }
      console.log("Password matched successfully")
      next()
      
    } catch (error) {
      //if there's an error while updating password
      console.error("Error occured while checking password:", error);
      return res.status(500).json({
        success: false,
        message: "Error occured while checking password",
        error: error.message,
      });
    }
  }