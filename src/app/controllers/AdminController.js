const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');
const CourseController = require('./CourseController');
const LectureController = require('./LectureController');
class AdminController {

    // [GET] /admin
    index(req, res) {
        res.render(path.join('admin', 'admin'));
    }
   
    // [GET] /admin/management-lecture
    managementLecture = LectureController.index;
    
    //[POST] /admin/addLecture
    addLecture = LectureController.addLecture;

    //[PUT] admin/updateLecture
    updateLecture = LectureController.updateLecture;

    //[DELETE] /admin/deleteLecture
    deleteLecture = LectureController.deleteLecture;


    // Management Course
    //[GET] /admin/management-course
    managementCourse = CourseController.index;

    //[POST] /admin/addCourse
    addCourse = CourseController.addCourse;

    //[PUT] /admin/editCourse
    editCourse = CourseController.editCourse;

    //[DELETE] /admin/deleteCourse
    deleteCourse = CourseController.deleteCourse;


    //Management Student
    
    managementStudent(req, res, next) {
        Student.find({})
            .then((students) => {
                Course.find({})
                    .then((courses) => res.render(path.join('admin', 'admin-student'), 
                    { students, courses }))
            })
            .catch((err) => next(err))



    }

    addStudent(req, res, next) {
        if (!("courses" in req.body))
            req.body.courses = [];
       // const listIdCourses = req.body.courses 
        let listIdCourses = [];


        
        typeof req.body.courses === "string"
          ? (listIdCourses.push(req.body.courses.split("-")[0]))
          : (listIdCourses = req.body.courses.map(
              (item) => item.split("-")[0]
            ));
        req.body.listIdCourses = listIdCourses;
        
        
        // Course.updateMany({_id: listIdCourses }, { $push: { listStudent: '5fb0f93e998b08055c270ae2' } })
        //     .then()
        //     .catch((err) => next(err));

        Student.create(req.body)
            .then(() => res.redirect('/admin/management-student'))
            .catch((err) => next(err))
        // console.log(!("courses" in req.body))
        // console.log(listIdCourses)

        //res.json(req.body)
    }

    //[PUT] /admin/editStudent
    editStudent(req, res, next) {
        if (!("courses" in req.body))
            req.body.courses = [];
       // const listIdCourses = req.body.courses 
        let listCourses = [];

        
        typeof req.body.courses === "string"
          ? listCourses.push({
              idCourse: req.body.courses.split("-")[0],
              nameCourse: req.body.courses.split("-")[1],
            })
          : (listCourses = req.body.courses.map(function(item) {
                const idCourse = item.split("-")[0];
                const nameCourse = item.split("-")[1];
                const course = { idCourse, nameCourse};
                return course;
          }));
        req.body.listCourses = listCourses;
        const listIdCourses = listCourses.map((item) => item.idCourse );
        
        const updateData = {
            name: req.body.name,
            email: req.body.email,
            phone: req.body.phone,
            listCourses: listCourses
        }

        Course.updateMany({ _id: listIdCourses }, { $addToSet: { listStudent: req.body.id } })
            .then()
            .catch((err) => next(err));

        Student.findByIdAndUpdate(req.body.id, updateData )
            .then(() => res.redirect('/admin/management-student'))
            .catch((err) => next(err))


        //console.log(listIdCourses)
        //console.log(updateData)
        //res.json(req.body)
    }

    //[DELETE] /admin/deleteStudent
    deleteStudent(req, res, next) {

        Course.updateMany({ listStudent: req.body.id }, 
            { $pull: { listStudent: req.body.id } })
            .then()
            .catch((err) => next(err));


        Course.find({listStudent: req.body.id})
            .then((data) => res.json(data))
            .catch((err) => next(err))
        // Student.findByIdAndDelete(req.body.id)
        //     .then(() => res.redirect('/admin/management-student'))
        //     .catch((err) => next(err));
    }
}

module.exports = new AdminController();
