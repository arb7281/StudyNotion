const RatingAndReview =  require("../models/RatingAndReview");
const Course = require("../models/Course");
// const mongoose = require("../mongoose");
const mongoose = require("mongoose")

//createRating
exports.createRating = async(req, res) => {
    try{
        //get user Id
        const userId = req.user.id;
        console.log("printing userId", userId)
        //fetchData from req body
        const {rating, review, courseId} = req.body;
        console.log("printing data received from frontend",  rating, review, courseId)
        //check if user is enrolled or not
        //course ki id se find out krop aur studentEnrolled match kro with following details
        const testCourseDetails = await Course.findOne({_id:courseId})

        console.log("printing testCourseDetails", testCourseDetails)
        const courseDetails = await Course.findOne(
                                        {_id:courseId,
                                        studentsEnrolled: {$elemMatch :{$eq: userId}},
                                    });
        
        console.log("printing courseDetails", courseDetails)                            

        if(!courseDetails) {
            return res.status(404).json({
                success: false,
                message:"Student is not enrolled in the course"
            })
        }                            

        //check if user already reviewed the course
        const alreadyReviewed = await RatingAndReview.findOne({
                                        user:userId,
                                        course:courseId
        });

        if(alreadyReviewed){
            return res.status(403).json({
                success: false,
                message:"Course is already reviewed by the user"
            })
        }

        //create rating and review
        const ratingReview = await RatingAndReview.create({
                                    rating, review,
                                    course: courseId,
                                    user:userId
        })

        //update course with this rating/review
        const updatedCourseDetails = await Course.findByIdAndUpdate({_id:courseId},
                                                {
                                                    $push: {
                                                        ratingsAndReviews: ratingReview._id,
                                                    }
                                                },
                                                {new: true});

    console.log(updatedCourseDetails);
    //return response
    return res.status(200).json({
        success: true,
        message:"Rating and Review created Successfully",
        ratingReview,
    })                                                
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}   

//getAverageRating
exports.getAverageRating = async (req, res) => {
    try{ 
        //get course ID
        const courseId = req.body.courseId;
        //calculate avg rating

        const result = await RatingAndReview.aggregate([
            {
                $match:{
                    //The function uses the aggregate method provided by the MongoDB driver to perform 
                    //aggregation on the RatingAndReview collection. It first matches documents where the course field matches the provided courseId
                    course: new mongoose.Types.ObjectId(courseId),
                },
            },
            {
                //then it groups matching documents and calculate its rating with the help of $avg aggregation operator on the rating field
                //this filed will be stored in result array as an object with keys _id and averageRating there will be only one object in result array though.
                $group:{
                    //here _id is null because we are calculating rating by combining rating of alll the documenments (effectively ignoring any specific values in the _id field of the document) 
                    //containing SAME course id hence no need to give id for this
                    _id:null,
                    //calculating average rating using $avg operator
                    averageRating: {$avg: "$rating"},
                }
            }
        ])

        //return rating
        if(result.length > 0) {
            return res.status(200).json({
                success: true,
                //since there is only one object in result array we are returning the same with its average rating
                averageRating: result[0].averageRating,
            })
        }

        //if no rating/review exist
        return res.status(200).json({
            success: true,
            message: "Average Rating is 0, no ratings given till now",
            averageRating: 0,
        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}

//getAllRatingAndReviews

exports.getAllRating = async (req, res) => {
    try{
        const allReviews = await RatingAndReviews.find({})
                                .sort({rating: "desc"})
                                .populate({
                                    path:"user",
                                    select:"firstName lastName email image"
                                })
                                .populate({
                                    path:"course",
                                    select:"courseName",
                                })
                                .exec();
        return res.status(200).json({
            success: true,
            message:"All reviews fetched successfully",
            data: allReviews,
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success:false,
            message:error.message,
        })
    }
}