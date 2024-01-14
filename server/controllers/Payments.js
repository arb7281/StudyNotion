//importing razorpay instance
const {instance} = require("../config/razorpay");
const Course = require("../models/Course");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
//first get these files from babbars code
const {courseEnrollmentEmail} = require("../mail/templates/courseEnrollmentEmail");
const mongoose = require("mongoose");
                                      

//capture the payment and initiate razorpay order
exports.capturePayment = async (req, res) => {

    //get courseId and userId
    const {course_id} = req.body;
    const userId = req.user.id;

    //validation
    //valid courseid he ki nhi check kro 
    if(!course_id){
        return res.json({
            success: flase,
            message:"Please povide valid course id"
        })
    };
    //valid course details us course id me course ki details aa rhi he kya nhi check kro
    let course;
    try{

        course = await Course.findById(course_id);

        if(!course){
            return res.json({
                success:false,
                message:"Could not find the course"
            })
        }
        //what if user already paid for the course
        // first of all userId ko object id me convert kro mongoose ka use krke
        const uid = new mongoose.Types.ObjectId(userId);
        if(course.studentsEnrolled.includes(uid)) {
            return res.status(200).json({
                success:false,
                message:"User already enrolled for this course"
            })
        }
    }catch(error){
        console.error(error);

        return res.status(500).json({
            success:false,
            message:error.message
        })
    }

    //create order now 
    const amount = course.price;
    const currency = "INR";

    //order create krne ke liye apn ko razorpay ka instance aur option create krne padt 
    //unmese instance apn already config folder me bana chuke he yaha pr options banayenge
    const options = {
        amount: amount * 100,
        currency,
        receipt: Math.random(Date.now()).toString(),
        notes:{//apn ko jab razorpay se webhook ki request ayegi tab iski use hogi kyonki webhook ki request client nhi marta razorpay marta he to usme courseId aur userId ane ki koi chance nhi
            courseId: course_id,
            userId
        }
    };
    //now creating order
    try{
        const paymentResponse = await instance.orders.create(options);
        console.log(paymentResponse);
        //return response
        return res.status(200).json({
            success:true,
            courseName: course.courseName,
            courseDescription:course.description,
            thumbnail:course.thumbnail,
            ordeId:paymentResponse.id,
            currency:paymentResponse.currency,
            amount:paymentResponse.amount,
        })
    }catch(error){
        console.log(error);
        res.json({
            success:false,
            message:"Could not initiate order"
        })
    }
    
};

//verify signature of razorpay and server we are getting req from razorpay aftersubmitting payment to verify that

exports.verifySignature = async (req, res) => {
//here we are comparing our webhookSecret key with razorpay's returned secret key but 
//razor pay's secret key is encrypted so we need to encrypt our webhookSecret to match 
//it with the secret key of razorpay

    const webhookSecret = "123454678";
//secret key of razorpay (this razorpay key we already have setup while making configuration in razorpay account)
    const signature = req.headers["x-razorpay-signature"];
//now with the help of crypto library we will encrypt our webhookSecret to match with razorpay's key
    const shasum = crypto.createHmac("sha256", webhookSecret);
//some mandatory steps
    shasum.update(JSON.stringyfy(req.body));
    const digest = shasum.digest("hex");


    //now comparing the keys's and doing actions accordingly
    if(signature === digest) {
        console.log("Payment is Authorised");
//to do the actions after verification first get the courseId and userId from razorpay's request by following below steps
        const {courseId, userId} = req.body.payload.payment.entity.notes;//in this notes we sent courseId and userId while creating/initiating an order
        
        try{
            //find the course and enroll the student in it
            const enrolledCourse = await Course.findOneAndUpdate({_id:courseId},
                                                                {$push:{studentsEnrolled:userId}},//we pushed the userId into course
                                                                {new:true},
                                                                );

            if(!enrolledCourse){
                return res.status(500).json({
                    success:false,
                    message:"Course not found"
                });
            } 
            
            console.log(enrolledCourse);

            //now we added student id to course now add courseid to users 
            //shift + alt to set cursor at multiple destination
            const enrolledStudent = await User.findOneAndUpdate(
                                                            {_id:userId},
                                                            {$push:{courses:courseId}},
                                                            {new:true}
            );
            console.log(enrolledStudent);

            //mail send krdo confirmation wala
            const emailResponse = await mailSender(
                                            enrolledStudent.email,//email
                                            "Congratulations from AmitsCourses",
                                            "Congratulations, you are onboarded into new codehelp course",
            );

            console.log(emailResponse);
            return res.status(200).json({
                success:true,
                message:"Signature Verified and Course added"
            });

        }catch(error){
            console.log(error);
            return res.status(500).json({
                success:false,
                message:error.message,
            })
        }

    }else{
        return res.status(400).json({
            success:false,
            message:'Invalid request',
        });
    }
}

