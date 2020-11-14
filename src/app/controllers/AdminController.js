const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');

class AdminController {

    // [GET] /admin
    index(req, res) {
        res.render(path.join('admin', 'admin'));
    }

    // [GET] /admin/management-lecture
    managementLecture(req, res, next) {
        
        Lecture.find({})
            .then((lectures) => {
                lectures.forEach((item) => console.log(item.createdAt))
                res.render(path.join('admin', 'admin-lecture'), { lectures });
            }).catch(err => next(err))
       
        //res.render(path.join('admin', 'admin-lecture'));
    }
    
    //[POST] /admin/addLecture
    addLecture(req, res, next) {
        const file = req.file
        
        file ? req.body.avatarLecture = req.file.path.split('public')[1] : req.body.avatarLecture = '';

        const lect = {
            name: req.body.inputNameLecture,
            email: req.body.inputEmailLecture,
            phone: req.body.inputPhoneLecture,
            categories: req.body.selectCategories,
            avatar: req.body.avatarLecture,
            description: req.body.inputDescLecture,
        }
        
        Lecture.create(lect, (err, lecture) => {
            res.redirect('/admin/management-lecture')
        })
 
    }  //end addLecture

    //[PUT] admin/updateLecture
    updateLecture(req, res, next) {
        const file = req.file

        file ? req.body.avatarLecture = req.file.path.split('public')[1] : req.body.avatarLecture = req.body.avatar2;

        const lect = {
            name: req.body.inputEditNameLecture,
            email: req.body.inputEditEmailLecture,
            phone: req.body.inputEditPhoneLecture,
            categories: req.body.selectEditCategories,
            avatar: req.body.avatarLecture,
            description: req.body.inputEditDescLecture,
        }
       
        Lecture.findByIdAndUpdate(req.body.idLecture, lect)
            .then(() => res.redirect('/admin/management-lecture'))
            .catch((err) => next(err))
        // console.log('avar', req.body.avatar2)
        // console.log('req ', req.body);
        // console.log('lect ', lect);
        // res.json(lect)
    }

    //[DELETE] /admin/deleteLecture
    deleteLecture(req, res, next) {
        Lecture.findByIdAndDelete(req.body.idDelete)
            .then(() => res.redirect('/admin/management-lecture'))
            .catch((err) => next(err));
    }


    // Management Course
    //[GET] admin/management-course
    managementCourse(req, res, next) {
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


    managementStudent(req, res, next) {
        Course.find()
            .then((courses) => res.render(path.join('admin', 'admin-student'), { courses }))
            .catch((err) => next(err))
        
    }

    addStudent(req, res, next) {
        res.json(req.body)
    }
}

module.exports = new AdminController();
