const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
    name:{type:String,
    required:true,
    },
    description:{
        type:String
    },
    link:{
        type:String
    },
    courses:{
        type:mongoose.Schema.Types.ObjectId,
    }

})

module.exports = mongoose.model("Category", categorySchema)