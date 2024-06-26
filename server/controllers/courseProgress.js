const mongoose = require("mongoose")
const Section = require("../models/Section")
const SubSection = require("../models/SubSection")
const CourseProgress = require("../models/CourseProgress")
const Course = require("../models/Course")


exports.updateCourseProgress = async(req,res) => {
    const {courseId, subsectionId} = req.body;
    const userId = req.user.id;

    try{
        //check if the subsection is valid
        const subSection = await SubSection.findById(subsectionId);

        console.log("printing subSectionId received from frontEnd", subSection)
        if(!subSection) {
            return res.status(404).json({error:"Invalid SUbSection"});
        }

        console.log("SubSection Validation Done");

        //check for old entry 
        let courseProgress = await CourseProgress.findOne({
            courseID:courseId.toString(),
            userId:userId.toString(),
        });

        // console.log("printing courseProgress", courseProgress)
        // if (!courseProgress) {
        //     courseProgress = new CourseProgress({
        //         courseID: courseId,
        //         userId: userId,
        //         completedVideos: [subsectionId], // Mark the current subsection as completed
        //     });
        // } else {
        //     // Check if the subsection has already been completed
        //     if (courseProgress.completedVideos.includes(subsectionId)) {
        //         return res.status(400).json({
        //             error: "Subsection already completed",
        //         });
        //     }

        //     // Push the subsection ID into completed videos
        //     courseProgress.completedVideos.push(subsectionId);
        // }
        if (!courseProgress) {
            return res.status(404).json({
              success: false,
              message: "Course progress Does Not Exist",
            })
          } else {
            // If course progress exists, check if the subsection is already completed
            if (courseProgress.completedVideos.includes(subsectionId)) {
              return res.status(400).json({ error: "Subsection already completed" })
            }
      
            // Push the subsection into the completedVideos array
            courseProgress.completedVideos.push(subsectionId)
          }
        await courseProgress.save();
        console.log("Course Progress Save call Done");
        return res.status(200).json({
            success:true,
            message:"Course Progress Updated Successfully",
        })
    }
    catch(error) {
        console.error(error);
        return res.status(400).json({error:"Internal Server Error"});
    }
}