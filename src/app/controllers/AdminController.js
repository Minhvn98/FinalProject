const path = require('path');


class AdminController {

    // [GET] /admin
    index(req, res) {
        res.render(path.join('admin', 'admin'));
    }

    // [GET] /admin/management-lecture
    managementLecture(req, res) {
        res.render(path.join('admin', 'admin-lecture'));
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
        
        res.send(req.body)
 
      }
      
}

module.exports = new AdminController;
