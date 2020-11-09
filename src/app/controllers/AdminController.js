const path = require('path');

const Lecture = require('../models/Lecture');

class AdminController {

    // [GET] /admin
    index(req, res) {
        res.render(path.join('admin', 'admin'));
    }

    // [GET] /admin/management-lecture
    managementLecture(req, res, next) {
        
        Lecture.find({})
            .then((lectures) => {
                console.log(lectures[0].numOfCourse)
                res.render(path.join('admin', 'admin-lecture'), { lectures });
            }).catch(err => next(err))
       
        //res.render(path.join('admin', 'admin-lecture'));
    }
    
    //[POST] /admin/add-lecture
    addLecture(req, res, next) {
        const file = req.file
        
        // if (!file) {
        //   const error = new Error('Please upload a file')
        //   error.httpStatusCode = 400
        //   return next(error)
        // }
        // if(!file) {
        //     req.body.avatarLecture = ''
        // } else {
        //     req.body.avatarLecture = req.file.path;
        // }

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
 
      }
      
}

module.exports = new AdminController;
