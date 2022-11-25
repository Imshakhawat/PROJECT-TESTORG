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
const questionPost = async (req,res) => {
    userVerified(req.cookies.jwt)
    if(id)
    {
        userModel.findById(id, async function(err,doc){
            if(err)//doesnt exists;
            {
                res.status(400).json({msg : "Unauthorized access"})////unauthorized access
            }
            else{
                const response = await roomModel.createQuestion(doc,req.body)
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
const questionGet = async (req,res) =>{
    userVerified(req.cookies.jwt)
    if(id)
    {
        await roomModel.findById(req.body._id, function(err,doc){
            if(err)//doesnt exists;
            {
                res.status(400).json({msg : "Unauthorized access"})////unauthorized access
            }
            else{
                res.status(200).json(doc);
            }
        })
        console.log(response) 
    }
    else{
        console.log("Unauthorized access");//404
        res.status(400).json({msg : "Unauthorized access"})
    }
}

module.exports = {questionPost, questionGet}