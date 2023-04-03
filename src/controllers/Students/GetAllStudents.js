const db = require('../../utils/db');

const getAllStudents = async (req,res)=>{
    const all = await db.student.findMany({
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
    })

    return res.status(200).json({students: all})
}

module.exports = getAllStudents