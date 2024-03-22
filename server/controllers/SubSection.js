const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course")
const {uploadimageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//create SubSection

exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req body
        const {sectionId, courseId, title, description} = req.body;
        console.log("printing subsection received details", sectionId, courseId, title, description)
        //extract file/video
        const video = req.files.video;
        //validation
        if(!sectionId || !title || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadimageToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSection:subSectionDetails._id,
                                                                }},
                                                                {new:true}).populate("subSection").exec();

        const updatedCourseDetails = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).exec() 
                                                               
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            updatedCourseDetails,
        })
    }catch(error){
        console.log(error)
        return res.status(500).json({
            success:false,
            message:"Internal Server Error",
            error:error.message,
        })
    }
}

//updating subsection
exports.updateSubSection = async (req, res) => {
    
    try {
        //fetch details from req body
        const {subSectionId, courseId, ...updated} = req.body;

        const videoFile = req.files?.video

        let uploadDetails;

        if(videoFile !== undefined){
            uploadDetails = await uploadimageToCloudinary(videoFile, process.env.FOLDER_NAME)
            updated.videoUrl = uploadDetails.secure_url
        }

        // if(!subSectionId || !title || !description) {
        //     return res.status(400).json({
        //         success:false,
        //         message:"Missing Properties"
        //     })
        // }

        const subSection = await SubSection.findByIdAndUpdate(subSectionId, {...updated}, {new:true});

        const updatedCourseDetails = await Course.findById(courseId).populate({
            path: 'courseContent',
            populate: {
                path: 'subSection'
            }
        }).exec()  
                                                                            
            return res.status(200).json({
            success:true,
            message:"subSection Updated Successfully",
            updatedCourseDetails
        });   
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Error while updating subsection",
            error:error.message,
        })
    }

}

//deleting a subSection
exports.deleteSubsection = async (req, res) => {
    try {
        const {subSectionId, sectionId, courseId} = req.body;
        //first remove the subSection id from that particular section
        await Section.findByIdAndUpdate({_id: sectionId},
            {
                $pull: {
                    subSection: subSectionId,
                }
            })
            //secondly remove subsection itself
            let subSection = await SubSection.findByIdAndDelete({_id: subSectionId})

            if(!subSection) {
                return res.status(404).json({success: false, message: "Subsection not found"})
            }

            // const updatedCourseDetails = await Course.findById(courseId).populate("courseContent").exec();

            const updatedCourseDetails = await Course.findById(courseId).populate({
                path: 'courseContent',
                populate: {
                    path: 'subSection'
                }
            }).exec() 
            

            return res.json({
                success: true,
                message: "SubSection deleted successfully",
                updatedCourseDetails
            })
    }catch(error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: "An Error occured while deleting the subsection"
        })
    }
}