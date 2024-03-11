const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadimageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config()

//createCourse handler function
exports.createCourse = async (req, res) => {
    try{

        // fetch data
        const { courseName, 
                courseDescription, 
                whatYouWillLearn, 
                price,
                category,
                tag,
                status,
                instructions} = req.body;

                console.log("printing category", category)
                console.log("printing instructions", instructions)

        //get thumbnail
        const thumbnail = req.files?.thumbnailImage;

        //validation
        if( !courseName || 
            !courseDescription || 
            !whatYouWillLearn || 
            !price || 
            !category 
            /* || 
            !thumbnail */) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        if (!status || status === undefined){
            status = "Draft";
        }
        //check for instructor
        const userId = req.user.id;
        //instructor ki details find out kro aur make sure krna 
        //userId se jab find kr rhae ho tab accountType Instructor hona chahiye
        const instructorDetails = await User.findById(userId,{accountType: "Instructor"});
        console.log("Instructor Details: ", instructorDetails);

        if(!instructorDetails){
            return res.status(400).json({
                success:false,
                message:"Instructor details not found",
            })
        }

        // check given category is valid or not
        const categoryDetails = await Category.findById(category);
        if(!categoryDetails){
            return res.status(400).json({
                success:false,
                message:"Category details not found",
            })
        }

        //Upload Image to Cloudinary
        if(thumbnail){
            const thumbnailImage = await uploadimageToCloudinary(thumbnail, 
                process.env.FOLDER_NAME);
        }
        
        // const instructionsArray = instructions.split(","); /* make sure you make necessary changes here if you find babbar's code is behaving different */

        //create an entry for new Course in DB
        const newCourse = await Course.create({
            courseName,
            courseDescription,
            instructor:instructorDetails._id,
            whatYouWillLearn:whatYouWillLearn,
            category: categoryDetails._id,
            price,
            tag:tag,
            // thumbnail:thumbnailImage.secure_url,
            status: status,
            instructions: instructions,
        });

        //add the new course to the user schema of instructor
        await User.findByIdAndUpdate(
            {_id:instructorDetails._id},
            {
                $push:{
                    courses:newCourse._id
                }
            },
            {new:true}
            );

            //add the new course to the categories
            await Category.findByIdAndUpdate(
                {_id: category},
                {
                    $push: {
                        course: newCourse._id,
                    }
                },
                {new: true}
            )
            //todo:HW

            //return response
            return res.status(200).json({
                success:true,
                message:"Course Crteated Successfully",
                data:newCourse
            })

}catch(error){
    console.error(error);
    return res.status(500).json({
        success:false,
        message:"Failed to create course",
        error: error.message
    })
}
}

// exports.editCourse = async (req, res) => {
//     try{

//         // fetch data
//         // const { courseName, 
//         //         courseDescription, 
//         //         whatYouWillLearn, 
//         //         price,
//         //         category,
//         //         tag,
//         //         status,
//         //         instructions,
//         //         courseId} = req.body;

//         const {courseId, ...updateFields} = req.body     

//         //get thumbnail
//         const thumbnail = req.files?.thumbnailImage;

//         //validation
//         if(!courseId){
//             return res.status(400).json({
//                 success:false,
//                 message:"Category details not found",
//             })
//         }
       

//         if (!updateFields.status || updateFields.status === undefined){
//             updateFields.status = "Draft";
//         }
//         //find instructor
//         const userId = req.user.id;
//         //instructor ki details find out kro aur make sure krna 
//         //userId se jab find kr rhae ho tab accountType Instructor hona chahiye
//         const instructorDetails = await User.findById(userId,{accountType: "Instructor"});
//         if (!instructorDetails) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Instructor details not found",
//             });
//         }
//         console.log("Instructor Details: ", instructorDetails);

//         if(!instructorDetails){
//             return res.status(400).json({
//                 success:false,
//                 message:"Instructor details not found",
//             })
//         }

//         //check given category is valid or not
//         // if (tag !== undefined) {
//         //   const categoryDetails = await Category.findById(tag);
//         //   if (!categoryDetails) {
//         //     return res.status(400).json({
//         //       success: false,
//         //       message: "Category details not found",
//         //     });
//         //   }
//         // }
        

//         //Upload Image to Cloudinary
//         if(thumbnail !== undefined){
//             const thumbnailImage = await uploadimageToCloudinary(thumbnail, 
//                 process.env.FOLDER_NAME);
//         }
        

//         //create an entry for new Course in DB
//         const newCourse = await Course.findByIdAndUpdate(
//             courseId,
//             {courseName,
//             courseDescription,
//             instructor:instructorDetails._id,
//             whatYouWillLearn:whatYouWillLearn,
//             price,
//             tag,
//             thumbnail:thumbnailImage.secure_url,
//             status: status,
//             instructions: instructions,},
//             {new:true}
//         );

//         //add the new course to the user schema of instructor
//         await User.findByIdAndUpdate(
//             {_id:instructorDetails._id},
//             {
//                 $push:{
//                     courses:newCourse._id
//                 }
//             },
//             {new:true}
//             );

//             //add the new course to the categories
//             if(category){
//                 await Category.findByIdAndUpdate(
//                     {_id: category},
//                     {
//                         $push: {
//                             course: newCourse._id,
//                         }
//                     },
//                     {new: true}
//                 )
//             }
            
//             //todo:HW

//             //return response
//             return res.status(200).json({
//                 success:true,
//                 message:"Course Crteated Successfully",
//                 data:newCourse
//             })

// }catch(error){
//     console.error(error);
//     return res.status(500).json({
//         success:false,
//         message:"Failed to create course",
//         error: error.message
//     })
// }
// }

//getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
            const allCourses = await Course.find({}, {courseName: true,
                                                        price:true,
                                                        thumbnail:true,
                                                        instructor:true,
                                                        ratingsAndReviews:true,
                                                        studentsEntrolled:true})
                                                        .populate("instructor")
                                                        .exec();

            return res.status(200).json({
                success:true,
                message:"Data for all courses fetched successfully",
                data:allCourses
            })                                            
    }catch(error){
        console.error(error);
        return res.status(500).json({
          success: false,
          message: "Cannot fetch data",
          error: error.message,
        });
    }
}


//get allCourses details 
exports.getCoursedetails = async (req, res) => {
    try {
        //get id
        const {courseId} = req.body;
        //find course details
        const courseDetails = await Course.find(
            {_id:courseId}).populate({
                path:"instructor",
                populate:{
                    path:"additionalDetails",
                }
            }).populate("category")
            // .populate("ratingAndReviews")
            .populate({
                path:"courseContent",
                populate:{
                    path:"subSection",
                }
            }).exec();

            //validation
            if(!courseDetails) {
                return res.status(400).json({
                    success: false,
                    message: "Course Details not fetched successfully",
                    data: courseDetails
                })
            }

            // return response
            return res.status(200).json({
                success: true,
                message: "Course Details Fetched Successfully",
                data: courseDetails
            })
    }catch(error){
        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

exports.updateCourse = async (req, res) => {
    try {
         // Assuming course id is passed in the URL
        const {courseId, ...updates} = req.body; // Fields to be updated sent from the client

        // Validate if any updates are provided
        if (Object.keys(updates).length === 0) {
            return res.status(400).json({
                success: false,
                message: "No updates provided"
            });
        }

        // Update the course in the database
        const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, updates, { new: true }).populate("courseContent").exec();

        if (!updatedCourseDetails) {
            return res.status(404).json({
                success: false,
                message: "Course not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "Course updated successfully",
            updatedCourseDetails
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update course",
            error: error.message
        });
    }
};
