const express = require('express');
const router = express.Router();

const studentController = require('../controllers/StudentController');

router.get('/:id', studentController.student);

module.exports = router;