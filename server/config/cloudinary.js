//import cloudinary
const cloudinary = require("cloudinary").v2;

//creating cloudinary instance configuration
exports.cloudinaryConnect = () => {
    try{
        cloudinary.config({
            // configuring the cloudinary to upload the media
            cloud_name: process.env.CLOUD_NAME,
            api_key: process.env.API_KEY,
            api_secret: process.env.API_SECRET
        })
        console.log("cloudinary connected successfully")
    }catch(error){
        console.log(error);
    }
}