const express = require('express');

const app = express();
const db = require('./src/utils/db');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

app.post("/api_keys",async (req,res)=>{
    const {name} = req.body;

    //Do the request
})

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`[APP] Application is running on port ${process.env.PORT || 3000}...`);
})