const mongoose = require("mongoose");
const mailSender = require("../utils/mailSender");
const emailTemplate = require("../mail/templates/emailVerificationTemplate");

const OTPSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },
    otp: {
        type:String,
        required: true
    },
    createdAt: {
        type:Date,
        default:Date.now(),
        expires: 50*60,//will expire after this
    }
})

//write your PRE(yane db me store hone se pehle) nad POST(yane db me store hone ke bad) middleware here ye function aage jake call hoga schema ke pre function me
async function sendVerificationEmail(email, otp) {
    try{
        const mailResponse = await mailSender(email, "verification Email from StudyNotion", emailTemplate(otp))
        // console.log("Email Sent Successfully: ", mailResponse)
    }
    catch(error){
        console.log("error while sending an email", error)
    }
}

OTPSchema.pre("save", async function (next){
    await sendVerificationEmail(this.email, this.otp);// direct schema se value uthayenge
    next();
})


module.exports = mongoose.model("OTP", OTPSchema)