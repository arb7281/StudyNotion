const express = require("express")
const app = express()

const userRoutes = require("./routes/User");
const profileRoutes = require("./routes/Profile")
// const profileRoutes = require("./routes/Profile");
const paymentsRoutes = require("./routes/Payments");
const courseRoutes = require("./routes/Course");
const Contact = require("./routes/Contact")
const database = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require("cors");
const {cloudinaryConnect} = require("./config/cloudinary");
const fileUpload = require("express-fileupload");

require("dotenv").config();
const PORT = process.env.PORT || 4000;

//CONNECT TO DATABASE
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
//jab kabhi bhi is address se frontend se request ayegi to mera backend ye hoga
app.use(
    cors({
        origin:"http://localhost:3000",
        credentials:true
    })
)
//mandatory steps to while uploading files to cloudinary and server
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp"
    })
)
//cloudinary connection
cloudinaryConnect();

//asigning base routes
app.use("/api/v1/auth", userRoutes);//login and signup...
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/course", courseRoutes);
app.use("/api/v1/payment", paymentsRoutes);
app.use("/api/v1/contact", Contact);



//default route
app.get("/", (req, res) => {
    return res.json({
        success:true,
        message:"Your server is up and running ...."
    })
})



app.listen(PORT, () => {
    console.log(`app is running at ${PORT}`)
})
