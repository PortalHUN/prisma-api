const db = require('../../utils/db')

const GetAllStudent = async (req,res)=>{
    const {Name} = req.params;

    const classData = await db.class.findUnique({
        where:{
            Name
        },
        include:{
            students: true
        }
    });

    if(!classData) return res.status(400).json({err:"No class found"});

    return res.status(200).json({class: classData});
}

module.exports = GetAllStudent;