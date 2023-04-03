const db = require('../../utils/db');

const GetStudent = async (req,res)=>{
    const {ID} = req.params;
    if(!ID) return res.status(400).json({err:"Invalid data"});
    
    const student = await db.student.findUnique({
        where:{
            ID
        },
        select:{
            ID: true,
            Name: true,
            Marks:{
                select:{
                    ID: true,
                    Mark: true
                }
            }
        }
    });

    if(!student) return res.status(400).json({err:"Student not found"});
    return res.status(200).json(student);

}

module.exports = GetStudent;