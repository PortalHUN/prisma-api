const db = require('../../utils/db');

const AddStudent = async (req,res)=>{
    const {Name} = req.body;
    if(!Name) return res.status(400).json({err:"Invalid data"})
    
    const student = await db.student.create({
        data:{
            Name
        }
    })

    return res.status(400).json({message:`Successfully inserted ${student.Name}`, student});
}

module.exports = AddStudent;