const User = require("../models/User");
const OTP = require("../models/OTP");
const otpGenerator= require("otp-generator")
const Profile = require("../models/Profile")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const mailSender = require("../utils/mailSender");
const {passwordUpdated} = require("../mail/templates/passwordUpdate")
require("dotenv").config()

//sendOTP before signUp yane generate kro aur aage bhejo ...
exports.sendOTP = async (req, res) => {

    try{// fetch email from req bvody
        const {email} = req.body;
    
        //check if user exist
        const checkUserPresent = await User.findOne({email});
    
        //if user exist, return a response
        if(checkUserPresent) {
            return res.status(401).json({
                success: false,
                message:'User already rgistered'
            })
        }
    
        //generate OTP}
    var otp = otpGenerator.generate(6, {
        upperCaseAlphabets: false,
        lowerCaseAlphabets: false,
        specialChars:false
    })

    // console.log("OTP-GENERATED", otp);

    //check otp is unique check if present in DB 
    let result = await OTP.findOne({otp: otp});

    while(result) {
        otp = otpGenerator.generate(6, {
            upperCaseAlphabets: false,
            lowerCaseAlphabets: false,
            specialChars: false
        })

        const result = await OTP.findOne({otp: otp});
    }

    const otpPayload = {email:email, otp:otp};
    //making entry in DB 
    const otpBody = await OTP.create(otpPayload);

    // console.log(otpBody);// check what is output

    //return response
    res.status(200).json({
        success: true,
        message: 'OTP Sent Successfully',//means generated successfully but showing user which is client that its been sent
        otp,
    })
}
catch(err){

    console.log(err);
    return res.status(500).json({
        success: false,
        message:err.message
    })
}
} 

//you can add validation like if the email is correctly entered or not 


//SignUp
exports.signUp = async (req, res) => {

   try{
     //data fetch from request ki body
     console.log("printing body data from frontend", req.body);
     const {firstName, 
        lastName, 
        email, 
        password, 
        confirmPassword,
        accountType,         
        otp} = req.body;
//validate karlo
if(!firstName || !lastName || !email || !password || !confirmPassword || !otp){
    return res.status(403).json({
        success: false,
        message: 'All fields are required'
    })
}


//2 password match krlo
if(password !== confirmPassword) {
    return res.status(400).json({
        success: false,
        message: 'password and ConfirPassword value does not matched, please try again'
    })
}


//check user already exist or not
const existingUser = await User.findOne({email});
if(existingUser){
    return res.status(400).json({
        success:false,
        message:'User is already exist'
    })
}


//find most recent OTP in db for latest otp updated
const recentOtp = await OTP.find({email}).sort({createdAt: -1}).limit(1);
console.log("recent otp is:", recentOtp);


//validate OTP
if(recentOtp.length == 0) {
    //OTP not found
    return res.status(400).json({
        success: false,
        message:'OTP not Found'
    })
}else if(otp !== recentOtp[0].otp){
    //Invalid Otp
    return res.status(400).json({
        success: false,
        message:'INVALID OTP'
    })
}



//hash password
const hashedPassword = await bcrypt.hash(password, 10);

//entry create in db
//first of all apn ko profileDetails lagengi jo ki shuruat me null rhengi bad me user sign up nkrke login krega tab usko additional details bhrne ko milengi
//isse dbme without email profile section me entry create hogi par id uniq hogi usase apn additional details nikal payenge
//create krne ke bad apn ka db me create hua object return hoga
const profileDetails = await Profile.create({
    email:email,
    gender:null,
    dateOfBirth: null,
    about:null,
    contactNumber:null
})

const user = await User.create({
    firstName, 
    lastName, 
    email, 
    password: hashedPassword,
    accountType, 
    additionalDetails: profileDetails._id,
    image:`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`})//idhar se profile image apn create krenge
//return response
return res.status(200).json({
    success: true,
    message:'User registered successfully',
    user,
})
}
catch(error){
    console.log(error);
    return res.status(500).json({
        success: false,
        message:"User Cannot be registered please try again"
    })
   }
};


//Login login krne ke bad jwt token banega aur wo req.user me save hoga
exports.login = async (req, res) => {
        try{
            const {email, password} = req.body;
            //validate data
            if(!email || !password) {
                return res.status(403).json({
                    success: false,
                    message:"All fields are required, please try again,"
                });

            }
            //user exist or not aur usko save kro taki password se compare kr sako
            const user =await User.findOne({email}).populate("additionalDetails");//signup krte time jo details bhari thi wo aa jayengi
            
            if(!user) {
                return res.status(401).json({
                    success:false,
                    message:"User is not registered, please signup first"
                })
            }
            //generate JWT after password matching
            if(await bcrypt.compare(password, user.password)){//line 193
                //after comparing password successfully create payload for to make jwt token
                const payload = {//apn ko jwt banate time lagega
                    email: user.email,
                    id: user._id,
                    accountType:user.accountType,
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET,{
                    expiresIn:"2h",
                });
                user.token = token;
                
                user.password= undefined;

                //create cookie send response
                //before generating cookie we need to create options
                const options = {
                    expires: new Date(Date.now() + 3*24*60*60*1000),
                    httpOnly: true
                }
                res.cookie("token", token, options).status(200).json({
                    success:true,
                    token,
                    user,
                    message:"logged in successfully"
                })
            }
            else{
                return res.status(401).json({
                    success: false,
                    message:"Passwored is incorrect"
                })
            }
            }catch(error){
                    console.log(error);
                    return res.status(500).json({
                        success: false,
                        message:"Login Failure, please try agin"
                    })
            
            }
};

//change Password HOMEWORK
exports.changePassword = async (req, res) => {
    try{
        //get data from req body
        const userDetails = await User.findById(req.user.id);
    //get oldPassword, newPassword, confirmPassword
    const {oldPassword, newPassword, confirmPassword} = req.body;
    //validation on the above data
    //check if old password and user current password is matched
        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        );
        //check if passwords matched or not
        if(!isPasswordMatch) {
            //if old password doesn't match return a 401 unauthorized error
            return res.status.json({success: false, message:"The password is incorrect"});
        }
        //now check if new password and confirm password fields matched or not
        if(newPassword !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "The password and confirm password does not match"
            })
        }
    //update pwd in DB
        const encryptedPassword = await bcrypt.hash(newPassword, 10);
        const updatedUserDetails = await User.findByIdAndUpdate(req.user.id, 
                                                                {password: encryptedPassword},
                                                                {new: true});
    //send mail - password updated
    try{
        const emailResponse = await mailSender(
            updatedUserDetails.email,
            "Your password has been changed",
            passwordUpdated(
                updatedUserDetails.email,
                `Password updated successfully for ${updatedUserDetails.firstName} ${updatedUserDetails.lastName}`
            )
        );
        console.log("Email sent successfully:", emailResponse.response);
    }catch(error){
        //if there an error sending the mail
        console.error("Error occured while sending email:",  error);
        return res.status(500).json({
            success: false,
            message: "Error occured while sending email",
            error: error.message
        })
    }
    //return response
    return res.status(200).json({
        success: true,
        message: "password updated successfully"});
        
} catch(error){
    //if there's an error while updating password
    console.error("Error occured while updating password:", error);
    return res.status(500).json({
        success: false,
        message: "Error occured while updating password",
        error: error.message,
    })
}
}