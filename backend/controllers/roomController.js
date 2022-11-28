// const roomWorking = async(req,res) =>{
//     console.log(req.path, req.method, req.cookies);
//     res.json({msg : "room working fine"});
// }
// const q_form = 
// [
//     {
//         "q_no": 1,
//         "q_type": "mcq",
//         "question": "how are you?",
//         "correct_answer": "fine",
//         "options": ["fine","good","bad"
//          ],
//         "marks": 3
//      },
//      {
//         "q_no": 2,
//         "q_type": "mcq",
//         "question": "how are you?",
//         "correct_answer": "fine",
//         "options": ["fine","good","bad"
//          ],
//         "marks": 3
//      },
//         {
//         "q_no": 3,
//         "q_type": "mcq",
//         "question": "how are you?",
//         "correct_answer": "fine",
//         "options": ["fine","good","bad"
//          ],
//         "marks": 3
//      }
// ]

const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel")
const roomModel = require("../models/roomModel")

const userVerified = (token) =>{
    jwt.verify(token,process.env.secret,async (err,decodedToken) =>{
        if(err){
            return id = "";//unauthorized access
        }
        else{
            return id = decodedToken._id;
        }
    })
}
const roomPost = async (req,res) => {
    userVerified(req.cookies.jwt)

    if(id)
    {
        userModel.findById(id, async function(err,userDoc){
            if(err)//doesnt exists;
            {
                res.status(400).json({msg : "Unauthorized access"})////unauthorized access
            }
            else{
                const response = await roomModel.createRoom(userDoc,req.body)
                if(response)
                    res.status(201).json({msg : "Questions Created Successfully"})
                else
                    res.status(500).json({err : "Question Creation failed"})
            }
        })
    }
    else{
        console.log("Unauthorized access");//404
        res.status(400).json({msg : "Unauthorized access"})
    }
}
const myroomGet = async (req,res) =>{
    userVerified(req.cookies.jwt)
    if(id)
    {
        const response = await roomModel.myRoom(req.body);
        res.status(200).json(response)      
    }
    else{
        console.log("Unauthorized access");//404
        res.status(400).json({msg : "Unauthorized access"})
    }
}

const viewRoom = async (req,res) =>{
    userVerified(req.cookies.jwt)
    if(id)
    {
        console.log(req.body)
        roomModel.findById(req.body, async function(err,userDoc){
            if(err)
            {
                res.status(400).json({msg : "Room Doesnt exist"})
            }
            else{
                res.status(200).json(userDoc);
            }
        })
    }
    else{
        console.log("Unauthorized access");//404
        res.status(400).json({msg : "Unauthorized access"})
    }
}

module.exports = {roomPost, myroomGet, viewRoom}