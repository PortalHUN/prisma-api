const router = require("express").Router();

router.post("/", require("../controllers/API/CreateAPIKey"));

router.get("/", require("../controllers/API/ShowAPIKey"));

router.put("/block", require("../controllers/API/BlockAPIKey"));

router.put("/admin", require("../controllers/API/AdminAPIKey"));

router.put("/uuid", require("../controllers/API/RefreshUUID"));

module.exports = router;
