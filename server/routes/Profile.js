const express = require("express")
const router = express.Router()
const {auth, checkPassword} = require("../middlewares/auth")
const {
    deleteAccount,
    updateProfile,
    getAllUserDetails,
    getEnrolledCourses,
    updateDisplayPicture,
} = require("../controllers/Profile")



//profile routes
//delete user accounts
router.delete("/deleteProfile",auth, checkPassword, deleteAccount)
router.put("/updateProfile", auth, updateProfile)
router.get("/getUserdetails", auth, getAllUserDetails)
//get enrolled courses
router.get("/getEnrolledCourses", auth, getEnrolledCourses)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)

module.exports = router