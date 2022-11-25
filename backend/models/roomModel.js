const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("./userModel")

const roomSchema = new mongoose.Schema({
    teacherName:{
        type:String
    },
    courseName:{
        type:String        
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId
    },
    questions:{
        type:[]
    },
    student:{
        type:[]
    }
})

roomSchema.statics.createQuestion = async function (doc,question){
    const room = await this.create({
        teacherId : doc._id,
        teacherName : doc.username,
        questions : question
    })
    const result = await userModel.updateOne({_id:doc._id},{$push : {myRooms:room._id}})
    return result.acknowledged
}

roomSchema.statics.getQuestion = async function(id){
    await this.findById(id, async function(err,doc){
        if(err)//doesnt exists;
        {
            res.status(400).json({msg : "Unauthorized access"})////unauthorized access
        }
        else{
            return
        }
    })
}
module.exports = mongoose.model("Room",roomSchema);