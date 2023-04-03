const router = require('express').Router();
const permission = require('../middlewares/CheckPermission');

router.post("/student", permission(["student.add"]), require('../controllers/Students/AddStudent'));

router.post("/mark", permission(["mark.add"]), require('../controllers/Students/AddMark'));

router.get('/:ID', permission(["student.get"]), require('../controllers/Students/GetStudent'));

router.get('/', permission(["student.get.all"]), require('../controllers/Students/GetAllStudents'));

router.post('/class', permission(["class.create"]), require('../controllers/Students/CreateClass'));

router.get('/class/:Name', permission(["class.get.all"]), require('../controllers/Students/ClassGetAllStudent'))

module.exports = router;