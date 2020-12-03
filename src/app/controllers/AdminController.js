const path = require('path');

const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');
const courseController = require('./CourseController');
const lectureController = require('./LectureController');
const studentController = require('./StudentController');
const Admin = require('../models/Admin');
class AdminController {
  // [GET] /admin
  async index(req, res) {
    const admin = await Admin.findById(req.params.id);
    const course = await Course.find({});
    const numCourse = course.length;

    const lecture = await Lecture.find({});
    const numLecture = lecture.length;

    const student = await Student.find({});
    const numStudent = student.length;

    const recentCourse = await Course.find({}, null, {
      sort: { createdAt: -1 },
      limit: 4,
    });
    console.log(admin);
    res.render(path.join('admin', 'admin'), {
      admin,
      numCourse,
      numStudent,
      numLecture,
      recentCourse,
    });
  }

  //[GET] /lecture/info/:id
  showInfo(req, res, next) {
    //res.json(req.params.id)
    Admin.findById(req.params.id).then((admin) =>
      res.render(path.join('admin', 'admin-info'), { admin })
    );
  }

  //[POST] /lecture/editInfo
  editInfo(req, res, next) {
    const file = req.file;
    file
      ? (req.body.avatar = req.file.path.split('public')[1])
      : (req.body.avatar = req.body.oldAvatar);
    console.log(req.file);

    Admin.findByIdAndUpdate(req.body.id, req.body)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
  }

  async changePassword(req, res, next) {
    const ad = await Admin.findById(req.body.id);

    if (ad.password !== req.body.password) {
      const admin = JSON.parse(JSON.stringify(ad));
      admin.changePassword = false;
      return res.render(path.join('admin', 'admin-info'), { admin });
    } else {
      await Admin.findByIdAndUpdate(req.body.id, {
        password: req.body.new_password,
      });
      const admin = JSON.parse(JSON.stringify(ad));
      admin.changePassword = true;
      return res.render(path.join('admin', 'admin-info'), { admin });
    }
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
