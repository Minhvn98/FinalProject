const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');

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
        
        file ? req.body.avatarLecture = req.file.path : req.body.avatarLecture = '';

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

        file ? req.body.avatarLecture = req.file.path : req.body.avatarLecture = req.body.avatar2;

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


    // Management Student
    //[GET] admin/management-student
    managementStudent(req, res, next) {
        res.render(path.join('admin', 'admin-student'));
    }

      
}

module.exports = new AdminController;
