const Course = require("../models/Course");
const Category = require("../models/Category");
const User = require("../models/User");
const {uploadimageToCloudinary} = require("../utils/imageUploader");
const Section = require("../models/Section");
const SubSection = require("../models/SubSection");
require("dotenv").config()
const mongoose = require("mongoose")

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
            !category || 
            !thumbnail ) {
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
            const thumbnailImage = await uploadimageToCloudinary(thumbnail, 
                process.env.FOLDER_NAME);
        
        
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
            thumbnail:thumbnailImage.secure_url,
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
                        courses: newCourse._id,
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

exports.editCourse = async (req, res) => {
    try{

        // fetch data
        const {courseId, ...updateFields} = req.body  
        console.log("printing updated fields in backend", updateFields)   

        //get thumbnail
        const thumbnail = req.files?.thumbnailImage;

        //validation
        if(!courseId){
            return res.status(400).json({
                success:false,
                message:"Category details not found",
            })
        }
       

        if (!updateFields.status || updateFields.status === undefined){
            updateFields.status = "Draft";
        }
  


        // check given category is valid or not yes again
        let categoryDetails
        if (updateFields.category) {
        categoryDetails = await Category.findById(updateFields.category);
        console.log("printing category detals in backend", categoryDetails)
          if (!categoryDetails) {
            return res.status(400).json({
              success: false,
              message: "Category details not found",
            });
          }
        }
        

        //Upload Image to Cloudinary
        if(thumbnail !== undefined){
            const thumbnailImage = await uploadimageToCloudinary(thumbnail, 
                process.env.FOLDER_NAME);
                updateFields.thumbnail = thumbnailImage.secure_url
        }
        

        //create an entry for new Course in DB
        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {...updateFields},
            {new:true}
        ).populate({
            path:"courseContent", 
            populate: {
                path: 'subSection'
            }
        }).exec();

        // const updatedCourseDetails = await Course.findById(courseId).populate({
        //     path: 'courseContent',
        //     populate: {
        //         path: 'subSection'
        //     }
        // }).exec() 

            //add the new course to the categories
            if(categoryDetails !== undefined){
                await Category.findByIdAndUpdate(
                    {_id: categoryDetails._id},
                    {
                        $push: {
                            course: updatedCourseDetails._id,
                        }
                    },
                    {new: true}
                )
            }
            
            //todo:HW

            //return response
            return res.status(200).json({
                success:true,
                message:"Course Crteated Successfully",
                updatedCourseDetails
            })

}catch(error){
    console.error("printing received error", error);
    return res.status(500).json({
        success:false,
        message:"Failed to create course",
        error: error.message
    })
}
}

//getAllCourses
exports.getAllCourses = async (req, res) => {
    try {
            const allCourses = await Course.find({status:"Published"}, {courseName: true,
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

exports.getAllInstructorCourses = async (req, res) => {

    const userId = req.user.id
    console.log("printing user id into fetchInstructorCourses", userId)

    try {
            const allCourses = await Course.find({ instructor: userId }).sort({createdAt: -1});

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

exports.deleteCourse = async (req, res) => {
    console.log("I am inside delete course")
  const courseId = req.body;
  const id = courseId.courseId
  console.log("courseId received at backend", id)
  try {
    const course = await Course.findById({_id:id});
    console.log("printing course", course)
    if (!course) {
      return res.status(404).json({
        message: "Course not found",
      });
    }
    //unenroll students from the course
    const studentsEnrolled = course.studentsEnrolled;
    //there will be user id's in studentsEnrolled object we are travering on this object using for of loop here studentsenrolled is an array so for of loop commonly used for arrays
    if(studentsEnrolled !== undefined){
        for (const studentId of studentsEnrolled) {
            // const objectId = mongoose.Types.ObjectId(studentId.match(/"([^"]+)"/)[1])
            await User.findByIdAndUpdate({_id:studentId}, {
              $pull: { courses: courseId },
            });
          }
    }
    
    //now delete sections and subsections from that course
    const courseSections = course.courseContent;
    console.log("printing courseSections", courseSections)
if(courseSections !== undefined){
    for (const sectionID of courseSections) {
        //delete sub sections
        const newSectionId = sectionID.toString()
        console.log("printing stringed section Id", newSectionId)
        // const objectId = mongoose.Types.ObjectId(sectionID.match(/"([^"]+)"/)[1])
        const section = await Section.findById(sectionID);
        console.log("printing section", section)
        if(section !== undefined){
            for (const subSectionId of section.subSection) {
                const newSubSectionId = subSectionId.toString()
                // const objectId = mongoose.Types.ObjectId(subSectionId.match(/"([^"]+)"/)[1])
                await SubSection.findByIdAndDelete(newSubSectionId);
              }
        }
        await Section.findByIdAndDelete(newSectionId);
      }
}
    
    await Course.findByIdAndDelete({_id:id});

    return res.status(200).json({
      success: true,
      message: "Course Deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Server error",
      error: error.message,
    });
  }
};

// exports.updateCourse = async (req, res) => {
//     try {
//          // Assuming course id is passed in the URL
//         const {courseId, ...updates} = req.body; // Fields to be updated sent from the client

//         // Validate if any updates are provided
//         if (Object.keys(updates).length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "No updates provided"
//             });
//         }

//         // Update the course in the database
//         const updatedCourseDetails = await Course.findByIdAndUpdate(courseId, updates, { new: true }).populate("courseContent").exec();

//         if (!updatedCourseDetails) {
//             return res.status(404).json({
//                 success: false,
//                 message: "Course not found"
//             });
//         }

//         return res.status(200).json({
//             success: true,
//             message: "Course updated successfully",
//             updatedCourseDetails
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to update course",
//             error: error.message
//         });
//     }
// };
