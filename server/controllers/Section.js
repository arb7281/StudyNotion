const Section = require("../models/Section");
const Course = require("../models/Course");

exports.createSection = async (req, res) => {
    try{
        //data fetch
        const {sectionName, courseId} = req.body;

        //data validation
        if(!sectionName || !courseId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            })
        }

        //create section
        const newSection = await Section.create({sectionName});
        //update course with section ObjectId
        const updatedCourseDetails = await Course.findByIdAndUpdate(
                                                    courseId,
                                                    {
                                                        $push:{
                                                            courseContent:newSection._id,
                                                        }
                                                    },
                                                    {new:true},
                                                ).populate("courseContent").exec();
        
        return res.status(200).json({
            success:true,
            message:"Section created successfully",
            updatedCourseDetails
        })
        
    }catch(error){
        return res.status(500).json({
            success: false,
            message:"unable to create section, please try again",
            error:error.message
        });
    }
}

//updating Section
exports.updateSection = async (req, res) => {
    try {

        //data input
        const {sectionName, sectionId, courseId} = req.body;
        //data validation
        if(!sectionName || !sectionId || !courseId) {
            return res.status(400).json({
                success:false,
                message:"Missing Properties"
            });
        }

        //update the data
        const section = await Section.findByIdAndUpdate(sectionId, {sectionName}, {new:true});

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $push:{
                    courseContent:section._id,
                }
            },
            {new: true},    
        ).populate("courseContent").exec()

        //return
        return res.status(200).json({
            success:true,
            message:"Section Updated Successfully",
            updatedCourseDetails
        });
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to update Section, please try again",
            error:error.message,
        })
    }
}


//deletion of section
exports.deleteSection = async (req, res) => {
    try {
        //get ID - assuming that we are sending ID in params
        const {sectionId, courseId} = req.params
        //use findByIdandDelete
        const deletedSection = await Section.findByIdAndDelete(sectionId);

        if (!deletedSection) {
            return res.status(404).json({
                success: false,
                message: "Section not found"
            });
        }

        const updatedCourseDetails = await Course.findByIdAndUpdate(
            courseId,
            {
                $pull: {
                    courseContent: sectionId // Remove the deleted section from courseContent array
                }
            },
            { new: true }
        ).populate("courseContent").exec();

        //return response
        return res.status(200).json({
            success:true,
            message:"Section Deleted Successfully",
            updatedCourseDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:"Unable to delete section, please try again",
            error:error.message
        })
    }
}