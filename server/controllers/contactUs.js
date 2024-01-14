const User = require("../models/User");
const mailSender = require("../utils/mailSender")
require("dotenv").config()
const contactUs = require('../mail/templates/contactUs')

exports.contactUs = async(req, res) => {
    try{
        const {email, firstName, lastName, message, phoneNumber} = req.body;

        const printData = {
            email: email,
            firstName: firstName,
            lastName: lastName,
            message: message,
            phoneNumber: phoneNumber
        }

        if(!email || !firstName || !message ) {
            return res.status(401).json({
                success:false,
                message: "User already registered"
            })
        }

        const mailResponse = await mailSender(process.env.TO, "Hello Amit User Contacted", contactUs(printData));

        console.log("mail send successfully");
        res.status(200).json({
            success: true,
            message: 'Message send successfully',
            printData
        })

    }catch(error){
        console.log("error aa gya bhai ", error);
        res.status(500).json({
            success: false,
            message:err.message
        })
    }
}