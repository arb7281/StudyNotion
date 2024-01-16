const Profile = require("../models/Profile");
const User = require("../models/User");
const Course = require("../models/Course");
const uploadimageToCloudinary = require("../utils/imageUploader");

exports.updateProfile = async (req, res) => {
    try {
        // getting data from req
        console.log("I am inside updateProfile")
        const {firstName, lastName, dateOfBirth="", about="", contactNumber="", gender="Don't want to disclose"} = req.body;
        //get userId
        const id = req.user.id;
        console.log("printing formData from req.body", req.body)
        //validation
        if(!contactNumber || !gender || !id) {
            return res.status(400).json({
                success:false,
                message:"All fields are requireed"
            })
        }
        //find profileId and details
        const userDetails = await User.findById(id);
        const profileId = userDetails.additionalDetails;//here additionalDetails would be only id becoz we haven't populated it yet
        const profileDetails = await Profile.findById(profileId);

        //update profile
        profileDetails.dateOfBirth = dateOfBirth;
        profileDetails.about = about;
        profileDetails.gender = gender;
        profileDetails.contactNumber = contactNumber;

        //save the updated profile
        await profileDetails.save();

        const updatedUserDetails = await User.findById(id).populate('additionalDetails').exec();

        if(firstName || lastName){
            updatedUserDetails.firstName = firstName
            updatedUserDetails.lastName = lastName
            updatedUserDetails.image=`https://api.dicebear.com/5.x/initials/svg?seed=${firstName} ${lastName}`
            await updatedUserDetails.save()
            console.log("printing userDetails", updatedUserDetails)
        }

        //return response
        return res.json({
            success:true,
            message:"Profile Updated successfully",
            updatedUserDetails
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            error:error.message
        })
    }

};

//deleteAccount
exports.deleteAccount = async (req, res) => {
    try {
        //get id
        console.log("I am inside deleteAccount")
        const id = req.user.id;
        
        //validation
        const userDetails = await User.findById({_id:id});

        if(!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        //finding all courses student entrolled
        const enrolledCourses = userDetails.courses;
        //this will give us array of course id's
        for(let courseId of enrolledCourses) {
            // Find course 
            const course = await Course.findById(courseId);
            
            // Pull user's id from enrolled courses
            course.studentsEnrolled.pull(id);  
            
            // Save course
            await course.save();
          }

        //delete profile
        await Profile.findByIdAndDelete({_id:userDetails.additionalDetails});

        //deeting the user
        await User.findByIdAndDelete({_id:id});

        return res.status(200).json({
            success:true,
            message:"User has been deleted"
        })

    }catch(error){
        //return response
        return res.status(500).json({
            success:false,
            message:"User cannot be Deleted"
        })
}
}

//getting all details of user
exports.getAllUserDetails = async (req, res) => {
    try {
        //get id
        const id = req.user.id;

        const user = await User.findById(id).populate("additionalDetails").exec();
        //return response
        return res.status(200).json({
            success:true,
            message:"User Data fetched successfully",
            user
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
}

//lets now update display picture
exports.updateDisplayPicture = async (req, res) => {

    function isFileTypeSupported (supportedTypes, fileType){
        return supportedTypes.includes(fileType)
    }

    try {
        const displayPicture = req.files.displayPicture;
        const userId = req.user.id;
        console.log("printing userId", userId);
        //cloudinary par upload hone ke bad apn ko object return hoga jo niche const image me store hoga
        console.log("before printing image", displayPicture);
        const supportedTypes = ["jpg", "jpeg", "png"]

        const fileType = displayPicture.name.split('.')[1].toLowerCase();

        if(!isFileTypeSupported(supportedTypes, fileType)){
            return res.status(400).json({
                success:false,
                message:'File Format not supported'
            })
        }
        console.log("printing after checking file name")
        const image = await uploadimageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        console.log("after printing image", image);
        const updatedProfile = await User.findByIdAndUpdate(
        {_id: userId},
        {image: image.secure_url},//ye secure url coudinary pe image upload hne ke bad jo object return hua udhar se mila he
        {new: true})
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: "Image upload to cloudinary unsuccessful"
        })
    }
}

exports.getEnrolledCourses = async (req, res) => {
    try {
        const userId = req.user.id;
        const userDetails = await User.findOne({
            _id: userId,
        }).populate("courses").exec()//jab user id se uska data nikaloge to usme se courses ki id milengi unko populate krdo

        if(!userDetails) {
            return res.status(400).json({
                success: false,
                message: `Could not find user with id: ${userDetails}`,
            })
        }
        return res.status(200).json({
            success: true,
            message:'Courses fetched successfully',
            data: userDetails.courses,
        })
    }catch (error) {
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
}

