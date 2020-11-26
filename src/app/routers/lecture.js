
const express = require('express');
const router = express.Router();

const lectureController = require('../controllers/LectureController');


router.get('/info/:id', lectureController.showInfo);
router.get('/:id', lectureController.lecture);
router.get('/courses/:slug', lectureController.detailCourse);


module.exports = router;