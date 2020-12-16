
const express = require('express');
const router = express.Router();
const upload = require('../middlewares/upload.file')

const lectureController = require('../controllers/LectureController');
const detailCourseController = require('../controllers/DetailCouseController');
const { route } = require('./student');

router.get('/getdata', lectureController.getdata)
router.get('/info/:id', lectureController.showInfo);
router.get('/:id', lectureController.lecture);
router.get('/courses/:slug', detailCourseController.detailCourse);
router.put('/editInfo', upload.single('avatar'), lectureController.editInfo);
router.put('/changePassword', lectureController.changePassword);

router.post('/courses/addYouCanLearn', detailCourseController.addYouCanLearn);
router.put('/courses/editYouCanLearn', detailCourseController.editYouCanLearn);
router.delete('/courses/deleteYouCanLearn', detailCourseController.deleteYouCanLearn);


router.post('/courses/addLesson', upload.single('fileLesson'), detailCourseController.addLesson)
router.put('/courses/editLesson', upload.single('fileLesson'), detailCourseController.editLesson)
router.delete('/courses/deleteLesson',detailCourseController.deleteLesson)

router.post('/courses/addHomeWork', upload.single('fileHomeWork'), detailCourseController.addHomeWork)
router.put('/courses/editHomeWork', upload.single('fileHomeWork'), detailCourseController.editHomeWork)
router.delete('/courses/deleteHomeWork',detailCourseController.deleteHomeWork)


router.post('/courses/addDocument', upload.single('fileDocument'), detailCourseController.addDocument)
router.put('/courses/editDocument', upload.single('fileDocument'), detailCourseController.editDocument)
router.delete('/courses/deleteDocument',detailCourseController.deleteDocument)

router.post('/courses/addRequirement', detailCourseController.addRequirement);
router.put('/courses/editRequirement', detailCourseController.editRequirement);
router.delete('/courses/deleteRequirement', detailCourseController.deleteRequirement);

router.post('/addComment', detailCourseController.addComment);
router.get('/homework/:id', lectureController.homeWork)


module.exports = router;