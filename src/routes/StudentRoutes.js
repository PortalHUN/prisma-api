const router = require('express').Router();
const permission = require('../middlewares/CheckPermission');

router.post("/student", permission(["student.add"]), require('../controllers/Students/AddStudent'));

router.post("/mark", permission(["mark.add"]), require('../controllers/Students/AddMark'));

router.get('/:ID', permission(["student.get"]), require('../controllers/Students/GetStudent'));

module.exports = router;