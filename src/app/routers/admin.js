
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');
const upload = require('../middlewares/upload.file')

router.get('/', adminController.index);

//Management Lecture
router.get('/management-lecture', adminController.managementLecture);
router.post('/addLecture', upload.single('avatarLecture'), adminController.addLecture);
router.put('/updateLecture', upload.single('editAvatarLecture'), adminController.updateLecture);
router.delete('/deleteLecture', adminController.deleteLecture);


//Management Course
router.get('/management-course', adminController.managementCourse);
router.post('/addCourse', upload.single('image'), adminController.addCourse);
router.put('/editCourse', upload.single('editImg'), adminController.editCourse);
router.delete('/deleteCourse', adminController.deleteCourse);

//Management Student
router.get('/management-student', adminController.managementStudent );
router.post('/addStudent', adminController.addStudent );

module.exports = router;
