const db = require("../../utils/db");

const AddMark = async (req,res)=>{
    const {ID, Mark} = req.body;

    if(!(Mark <=5 && Mark>=1)) return res.status(400).json({err:"Mark must be between 1 and 5"});

    const exists = await db.student.findUnique({
        where:{
            ID
        }
    });
    if(!exists) return res.status(400).json({err:"Student does not exists"});

    const insert = await db.mark.create({
        data:{
            StudentID: ID,
            Mark
        }
    });
    
    return res.status(200).json({message:"Successfully inserted mark", insert});
}

module.exports = AddMark;