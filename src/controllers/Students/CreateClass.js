const db = require('../../utils/db');

const CreateClass = async (req,res)=>{
    const {Name} = req.body;
    if(!Name) return res.status(400).json({err:"You must insert a Class Name"});

    const exists = await db.class.findUnique({
        where:{
            Name
        }
    });
    if(exists) return res.status(400).json({err:"This Class Name already exists"})

    const insert = await db.class.create({
        data:{
            Name
        }
    });

    return res.status(200).json({message:"Successfully created Class", class:insert});
}

module.exports = CreateClass;