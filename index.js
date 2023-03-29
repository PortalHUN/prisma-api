//DB String
//DATABASE_URL=mysql://root:@localhost:3306/api

require('dotenv').config();
const express = require('express');

const app = express();
const db = require('./src/utils/db');

app.use(express.json());
app.use(express.urlencoded({extended:false}));

//ALLTIME MIDDLEWARES
app.use(require('./src/middlewares/CheckAPIKey'));

//ADMIN ROUTES
app.use('/api/admin/api_keys', require('./src/routes/APIRoutes'));

app.listen(process.env.PORT || 3000, ()=>{
    console.log(`[APP] Application is running on port ${process.env.PORT || 3000}...`);
})