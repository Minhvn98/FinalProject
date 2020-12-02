const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');
const courseController = require('./CourseController');
const lectureController = require('./LectureController');
const studentController = require('./StudentController');
class AdminController {

    // [GET] /admin
    async index(req, res) {
        const course = await Course.find({});
        const numCourse = course.length;

        const lecture = await Lecture.find({});
        const numLecture = lecture.length

        const student = await Student.find({});
        const numStudent = student.length

        const recentCourse = await Course.find({}, null, { sort: { createdAt: -1 }, limit: 4 });

        res.render(path.join('admin', 'admin'), { numCourse, numStudent, numLecture, recentCourse});
    }
   
    // [GET] /admin/management-lecture
    managementLecture = lectureController.index;
    
    //[POST] /admin/addLecture
    addLecture = lectureController.addLecture;

    //[PUT] admin/updateLecture
    updateLecture = lectureController.updateLecture;

    //[DELETE] /admin/deleteLecture
    deleteLecture = lectureController.deleteLecture;


    // Management Course
    //[GET] /admin/management-course
    managementCourse = courseController.index;

    //[POST] /admin/addCourse
    addCourse = courseController.addCourse;

    //[PUT] /admin/editCourse
    editCourse = courseController.editCourse;

    //[DELETE] /admin/deleteCourse
    deleteCourse = courseController.deleteCourse;


    //[GET] /admin/management-student
    managementStudent = studentController.managementStudent;

    //[POST /admin/addStudent
    addStudent = studentController.addStudent;

    //[PUT] /admin/editStudent
    editStudent = studentController.editStudent;

    //[DELETE] /admin/deleteStudent
    deleteStudent = studentController.deleteStudent;
}

module.exports = new AdminController();
