
const express = require('express');
const router = express.Router();

const lectureController = require('../controllers/LectureController');
const detailCourseController = require('../controllers/DetailCouseController');


router.get('/info/:id', lectureController.showInfo);
router.get('/:id', lectureController.lecture);
router.get('/courses/:slug', detailCourseController.detailCourse);


router.post('/courses/addYouCanLearn', detailCourseController.addYouCanLearn)

module.exports = router;