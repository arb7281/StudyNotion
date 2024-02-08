//import the required modules
const express = require("express")
const router = express.Router()

//Import the controllers

const {
    createCourse,
    getAllCourses,
    getCoursedetails,
    editCourse,
} = require("../controllers/Course")

//Categories Controllers Import
const {
    showAllCategories,
    createCategory,
    categoryPageDetails,
} = require("../controllers/Category")

//Sections Controllers Import
const {
    createSection,
    updateSection,
    deleteSection,
} = require("../controllers/Section")

//sub-section Controllers Import
const {
    createSubSection,
    updateSubSection,
    deleteSubsection
} = require("../controllers/SubSection")

//Rating Controllers Import
const {
    createRating,
    getAverageRating,
    getAllRating
    
} = require("../controllers/RatingAndReview")

//Importing Middlewares
const {auth, isInstructor, isStudent, isAdmin} = require("../middlewares/auth")

//routes for instructor
//Courses can only be created by Instructors
router.post("/createCourse", auth, isInstructor, createCourse)
router.post("/editCourse", auth, isInstructor, editCourse)
//Add a section to a course
router.post("/addSection", auth, isInstructor, createSection)
//update a section
router.post("/updateSection", auth, isInstructor, updateSection)
//Delete a section
router.post("/deleteSection", auth, isInstructor, deleteSection)
//Edit sub section
router.post("/updateSubSection", auth, isInstructor, updateSubSection)
//Delete Sub Section
router.post("/deleteSubSection", auth, isInstructor, deleteSubsection)
//Add a Sub Section to a section
router.post("/addSubSection", auth, isInstructor, createSubSection)
//get all registered courses
router.get("/getAllCourses", getAllCourses)
//get details for a specific courses
router.post("/getCourseDetails", getCoursedetails)

//routes for admins
router.post("/createCategory", auth, isAdmin, createCategory)
router.get("/showAllCategories", showAllCategories)
router.post("/getCategoryPageDetails", categoryPageDetails)

//routes for rating and reviews
router.post("/createRating", auth, isStudent, createRating)
router.get("/getAverageRating", getAverageRating)
router.get("/getReviews", getAllRating)

module.exports = router