const path = require('path');

const Admin = require('../models/Admin');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const Notification = require('../models/Notification');
const Student = require('../models/Student');

const courseController = require('./CourseController');
const lectureController = require('./LectureController');
const studentController = require('./StudentController');

class AdminController {
  // [GET] /admin
  async index(req, res) {
    const adminPromise = await Admin.findById(req.session.adminId);
    const coursesPromise = Course.count({});
    const lecturesPromise = Lecture.count({});
    const studentsPromise = Student.count({});
    const recentCoursePromise = Course.find({}, null, {
      sort: { createdAt: -1 },
      limit: 4,
    });

    const admin = await adminPromise;
    const numCourse = await coursesPromise;
    const numLecture = await lecturesPromise;
    const numStudent = await studentsPromise;
    const recentCourse = await recentCoursePromise;

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
    Admin.findById(req.session.adminId).then((admin) =>
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

  //[GET] /admin/getNotification
  getNotification(req, res, next) {
    Notification.find({ idUserReceived: req.session.adminId }, null, {
      sort: { createdAt: -1 },
    })
      .then((data) => res.json(data))
      .catch((err) => next(err));
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
