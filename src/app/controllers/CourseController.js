const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');

class CourseController {

    //[GET] /admin/management-course
    index(req, res, next) {
        Course.find({})
            .then((courses) => {
                Lecture.find({}, 'name')
                .then((lectures) => {
                    //console.log('course : ', courses);
                    //.log('lectures : ', lectures)
                    res.render(path.join('admin', 'admin-course'), { courses, lectures });
                })
            })
            
            .catch((err) => next(err));
        //res.render(path.join('admin', 'admin-course'));
    }

    //[POST] /admin/addCourse
    addCourse(req, res, next) {
        const file = req.file
        file ? req.body.image = req.file.path.split('public')[1] : req.body.image = 'trong';
        
        const course = new Course({
            name: req.body.name,
            categories: req.body.categories,
            description: req.body.description,
            level: req.body.level,
            lecture: { 
                lectureId: req.body.lecture.split('-')[0], 
                name: req.body.lecture.split('-')[1] },
            videoId: req.body.videoId,
            image: req.body.image,
            price: req.body.price
        });

        console.log(course);

        Course.create(course)
            .then(() => res.redirect('/admin/management-course'))
            .catch((err) => next(err))
        //Course.find({}).then((i)=>res.json(i))
        
        //res.json(course1)

    }


    //[PUT] /admin/editCourse
    editCourse(req, res, next) {
        const file = req.file
        file ? req.body.image = req.file.path.split('public')[1] : req.body.image = req.body.imgOld;
        
        const course = {
            name: req.body.name,
            categories: req.body.categories,
            description: req.body.description,
            level: req.body.level,
            lecture: { 
                lectureId: req.body.lecture.split('-')[0], 
                name: req.body.lecture.split('-')[1] },
            videoId: req.body.videoId,
            image: req.body.image,
            price: req.body.price
        };

        Course.findByIdAndUpdate(req.body.id, course)
            .then(() => res.redirect('/admin/management-course'))
            .catch((err) => next(err))

        // console.log(course);
        // res.json(course);
    }
      
    //[DELETE] /admin/deleteCourse
    deleteCourse(req, res, next) {
        //res.json(req.body)
        Course.findByIdAndDelete(req.body.id)
            .then(() => res.redirect('/admin/management-course'))
            .catch((err) => next(err))
    }
}

module.exports = new CourseController();