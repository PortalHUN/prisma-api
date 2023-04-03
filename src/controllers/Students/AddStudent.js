const db = require('../../utils/db');

const AddStudent = async (req,res)=>{
    const {Name, ClassName} = req.body;
    if(!Name || !ClassName) return res.status(400).json({err:"Invalid data"})
    
    const classID = await db.class.findUnique({
        where:{
            Name:ClassName
        },
        select:{
            ID:true
        }
    })
    if(!classID) return res.status(400).json({err:"No class found"});

    const student = await db.student.create({
        data:{
            Name,
            ClassID: classID.ID
        }
    })

    return res.status(400).json({message:`Successfully inserted ${student.Name}`, student});
}

module.exports = AddStudent;