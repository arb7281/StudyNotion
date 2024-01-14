//import the required modules
const express = require("express")
const router = express.Router()

//Import the required controllers and middleware functions
const {
    login,
    signUp,
    sendOTP,
    changePassword
} = require("../controllers/Auth")

const {
    resetPasswordToken,
    resetPassword
} = require("../controllers/ResetPassword")

const {auth} = require("../middlewares/auth")

console.log("I am inside profileRoutes");

//Routes for Login, signUp, and Authentication
router.post("/login", login)

//route for user signup
router.post("/signup", signUp)

//route for sending OTP to the user's email
router.post("/sendotp", sendOTP)

//route for changing the password
router.post("/changepassword", auth, changePassword)

//reset password

//route for generating a reset password token
router.post("/reset-password-token", resetPasswordToken)

//route for resetting user's password after verification
router.post("/reset-password", resetPassword)

//Export the router for use in the main application
module.exports = router