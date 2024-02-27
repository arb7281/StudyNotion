const SubSection = require("../models/SubSection");
const Section = require("../models/Section");
const Course = require("../models/Course")
const {uploadImageToCloudinary} = require("../utils/imageUploader");
require("dotenv").config();

//create SubSection

exports.createSubSection = async (req, res) => {
    try {
        //fetch data from req body
        const {sectionId, title, timeDuration, description} = req.body;
        //extract file/video
        const video = req.files.videoFile;
        //validation
        if(!sectionId || !title ||!timeDuration || !description || !video) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }
        //upload video to cloudinary
        const uploadDetails = await uploadImageToCloudinary(video, process.env.FOLDER_NAME);
        //create a sub-section
        const subSectionDetails = await SubSection.create({
            title:title,
            timeDuration:timeDuration,
            description:description,
            videoUrl:uploadDetails.secure_url,
        })
        //update section with this sub section ObjectId
        const updatedSection = await Section.findByIdAndUpdate({_id:sectionId},
                                                                {$push:{
                                                                    subSection:subSectionDetails._id,
                                                                }},
                                                                {new:true}).populate("subSection").exec();
        return res.status(200).json({
            success:true,
            message:"Sub section created successfully",
            updatedSection,
        })
    }catch(error){
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
        const {SubSectionId, title, timeDuration, description} = req.body;

        if(!SubSectionId || !title || !timeDuration || !description) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        const subSection = await SubSection.findByIdAndUpdate(SubSectionId, {
                                                                            title,
                                                                            timeDuration,
                                                                            description}, {new:true});
            return res.status(200).json({
            success:true,
            message:"subSection Updated Successfully",
            subSection
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
            const subSection = await SubSection.findByIdAndDelete({_id: subSection})

            if(!subSection) {
                return res.status(404).json({success: false, message: "Subsection not found"})
            }

            const updatedCourseDetails = await Course.findById(courseId).populate("courseContent").exec();
            

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