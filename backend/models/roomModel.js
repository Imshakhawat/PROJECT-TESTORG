const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const userModel = require("./userModel")

const roomSchema = new mongoose.Schema({
    teacherName:{
        type:String
    },
    teacherId:{
        type: mongoose.Schema.Types.ObjectId
    },
    courseName:{
        type: String
    },
    questions:{
        type:[]
    },
    student:{
        type:[]
    },
    startTime : {
        type: Date
    },
    endTime : {
        type: Date
    },
    createdAt : {type: Date},
})

roomSchema.statics.createRoom = async function (userDoc,room){
    const newRoom = await this.create({ 
        teacherId : userDoc._id,
        teacherName : userDoc.username,
        courseName : room.courseName,
        questions : room.question,
        startTime : room.startTime,
        endTime : room.endTime,
        createdAt : room.createdAt   
    })
    const result = await userModel.updateOne({_id:userDoc._id},{$push : {
        myRooms:
        {
            "roomID" :newRoom._id,
            "startTime" : room.startTime,
            "endTime" : room.endTime,
            "CourseName" : room.courseName,
            "CreatedAt" : room.createdAt
        }
    }})
    return result.acknowledged
}

roomSchema.statics.myRoom = async function(id){
    const roomData = await userModel.find({_id:id},{myRooms:1})
    // console.log(roomData)
    return roomData;
}

roomSchema.statics.roomInfo = async function(userDoc)
{
    this.findById(id, (err,doc)=>{
        if(err){
            throw Error("Room doesnt exist");
        }
        else{
            console.log(doc);
            return doc;
        }
    })
}
module.exports = mongoose.model("Room",roomSchema);