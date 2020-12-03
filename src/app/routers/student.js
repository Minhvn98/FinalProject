const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');

router.get('/:id', studentController.student);
router.get('/info/:id', studentController.showInfo);

module.exports = router;