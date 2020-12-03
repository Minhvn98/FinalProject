const path = require("path");

const Lecture = require("../models/Lecture");
const Student = require("../models/Student");
const Course = require("../models/Course");
const Admin = require("../models/Admin");
class LectureController {
  //[GET] /admin/management-lecture
  async index(req, res, next) {
    const admin = await Admin.findById(req.session.adminId);
    Lecture.find({})
      .then((lectures) => {
        //lectures.forEach((item) => console.log(item.createdAt));
        res.render(path.join("admin", "admin-lecture"), { admin, lectures });
      })
      .catch((err) => next(err));

    //res.render(path.join('admin', 'admin-lecture'));
  }

  //[POST] /admin/addLecture
  addLecture(req, res, next) {
    const file = req.file;

    file
      ? (req.body.avatarLecture = req.file.path.split("public")[1])
      : (req.body.avatarLecture = "");

    const lect = {
      name: req.body.inputNameLecture,
      email: req.body.inputEmailLecture,
      phone: req.body.inputPhoneLecture,
      categories: req.body.selectCategories,
      avatar: req.body.avatarLecture,
      description: req.body.inputDescLecture,
    };

    Lecture.create(lect, (err, lecture) => {
      res.redirect("/admin/management-lecture");
    });
  } //end addLecture


  //[PUT] admin/updateLecture
  updateLecture(req, res, next) {
    const file = req.file;

    file
      ? (req.body.avatarLecture = req.file.path.split("public")[1])
      : (req.body.avatarLecture = req.body.avatar2);

    const lect = {
      name: req.body.inputEditNameLecture,
      email: req.body.inputEditEmailLecture,
      phone: req.body.inputEditPhoneLecture,
      categories: req.body.selectEditCategories,
      avatar: req.body.avatarLecture,
      description: req.body.inputEditDescLecture,
    };

    Lecture.findByIdAndUpdate(req.body.idLecture, lect)
      .then(() => res.redirect("/admin/management-lecture"))
      .catch((err) => next(err));
    // console.log('avar', req.body.avatar2)
    // console.log('req ', req.body);
    // console.log('lect ', lect);
    // res.json(lect)
  }

  //[DELETE] /admin/deleteLecture
  deleteLecture(req, res, next) {
    Lecture.findByIdAndDelete(req.body.idDelete)
      .then(() => res.redirect("/admin/management-lecture"))
      .catch((err) => next(err));
  }



  //[GET] /lecture
  lecture(req, res, next) {

    Lecture.findById(req.params.id)
      .populate('listCourse')
      .then((lect) => {
        return res.render(path.join("lecture", "lecture"), { lect })
    });
 
  }

  //[GET] /lecture/info/:id
  showInfo(req, res, next) {
    //res.json(req.params.id)
    Lecture.findById(req.params.id).then((lect) =>
      res.render(path.join("lecture", "lecture-info"), { lect })
    );
  }

  //[POST] /lecture/editInfo
  editInfo(req, res, next) {
    const file = req.file;
    file
      ? (req.body.avatar = req.file.path.split("public")[1])
      : (req.body.avatar = req.body.oldAvatar);
    console.log(req.file)
    
    Lecture.findByIdAndUpdate(req.body.id, req.body)
      .then(() => res.redirect('back'))
      .catch((err) => next(err))
  }

  async changePassword(req, res, next) {
    const lecture = await Lecture.findById(req.body.id);

    if(lecture.password !== req.body.password) {
      const lect = JSON.parse(JSON.stringify(lecture))
      lect.changePassword = false;
      res.location('/foo/bar')
      return res.render(path.join("lecture", "lecture-info"), { lect })

    } else {
      await Lecture.findByIdAndUpdate(req.body.id, { password: req.body.new_password })
      const lect = JSON.parse(JSON.stringify(lecture))
      lect.changePassword = true;
      res.location('/foo/bar')
      return res.render(path.join("lecture", "lecture-info"), { lect })
    }

    
  }

}

module.exports = new LectureController();
