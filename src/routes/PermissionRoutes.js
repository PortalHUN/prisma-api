const router = require("express").Router();

//New Permission
router.post("/", require("../controllers/Permissions/AddPermission"));

//Delete Permission
router.delete("/", require("../controllers/Permissions/RemovePermission"));

module.exports = router;
