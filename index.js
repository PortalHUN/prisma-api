//DB String
//DATABASE_URL=mysql://root:@localhost:3306/api

require("dotenv").config();
const express = require("express");

const app = express();
const db = require("./src/utils/db");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Permission middleware
const permission = require("./src/middlewares/CheckPermission");

/*app.get('/a',async (req,res)=>{
  const jwt = require('jsonwebtoken')
  const token = await jwt.sign({ Name: "Main", API_key: "3c889f5c-c984-44c7-8e80-3f9d2b6e8e23" }, process.env.APIKEYSECRET);
  return res.status(200).json({token})
})*/

//ALLTIME MIDDLEWARES
app.use(require("./src/middlewares/CheckAPIKey"));

//USER ROUTES
app.get("/", (req, res) => {
  res.status(200).json({ message: `Welcome to the Backend API,${req.api.Admin ? " Admin" : ""} ${req.api.Name}!`, api: req.api });
});
app.use('/students', require('./src/routes/StudentRoutes'));

//ADMIN ROUTES
app.use("/admin/api/keys", permission("Admin"), require("./src/routes/APIRoutes"));
app.use("/admin/api/permission", permission("Admin"), require("./src/routes/PermissionRoutes"));

app.all('*',(req,res)=>{
  return res.status(404).json({err:"Page not found"})
})

app.listen(process.env.PORT || 3000, () => {
  console.log(`[APP] Application is running on port ${process.env.PORT || 3000}...`);
});
