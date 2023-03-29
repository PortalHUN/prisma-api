const router = require('express').Router();

router.post('/create', require('../controllers/API/CreateAPIKey'));

router.post('/show', require('../controllers/API/ShowAPIKey'));

module.exports = router;