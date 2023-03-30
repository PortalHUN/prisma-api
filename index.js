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

//ALLTIME MIDDLEWARES
app.use(require("./src/middlewares/CheckAPIKey"));

app.get("/", (req, res) => {
  res.status(200).json({ message: `Welcome to the Backend API,${req.api.Admin ? " Admin" : ""} ${req.api.Name}!`, api: req.api });
});

//ADMIN ROUTES
app.use("/admin/api/keys", permission("Admin"), require("./src/routes/APIRoutes"));
app.use("/admin/api/permission", permission("Admin"), require("./src/routes/PermissionRoutes"));

app.listen(process.env.PORT || 3000, () => {
  console.log(`[APP] Application is running on port ${process.env.PORT || 3000}...`);
});
