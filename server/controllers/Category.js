 const Category = require("../models/Category");

 //create tag handler

 exports.createCategory = async (req, res) => {
    try{
        //fetch data
        const {name, description} = req.body;

        //validation
        if(!name || !description) {
            return res.status(400).json({
                success:false,
                message:"All fields are required"
            })
        }

        //crete entry in DB
        const categoryDetails = await Category.create({
            name:name,
            description:description,
        });
        console.log(categoryDetails);
        //return response

        return res.status(200).json({
            success:true,
            message:"Tag Created Successfully"
        })
    }catch(error){
        return res.status(500).json({
            success:false,
            message:error.message
        })
    }
 }

 //now getting alltags at once
 exports.showAllCategories = async (req, res) => {
    try{
        const allCategory = await Category.find({},{name:true, description:true, link:true})//mujhe malu nhi kiske basis par tags fetch kru mujhe sare tags lake do un sab me name aur description hona chahiye
        res.status(200).json({
            success:true,
            message:"All tags fetched successfully",
            allCategory
        })
    }catch(error){
        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
 }

 //categoryPagedetails

 exports.categoryPageDetails = async (req, res) => {
    try {
        //get categoryid
        const {categoryId} = req.body;

        //get courses for specified categoryId
        const selectedCategory = await Category.findById(categoryId).polpulate("courses").exec();

        //validation
        if(!selectedCategory) {
            return res.status(404).json({
                success: false,
                message: 'Data not found'
            })
        }

        //getting top 10 most selling courses
        const topSellingCourses = selectedCategory.courses.sort((a, b) => a.salesCount - b.salesCount).slice(0, 10)

        //get course for different categories
        const differentCategories = await Category.find({
            _id:{$ne: categoryId},
        }).populate("courses").exec();

        //return response
        return res.status(200).json({
            success: true,
            data: {
                selectedCategory,
                topSellingCourses,
                differentCategories
            }
        })
    }catch(error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message
        })
    }
 }