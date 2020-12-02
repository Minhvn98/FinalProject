const path = require('path');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');
class StudentController {

  //[GET] /admin/management-student
  managementStudent(req, res, next) {
    Student.find({})
      .then((students) => {
        Course.find({}).then((courses) =>
          res.render(path.join('admin', 'admin-student'), { students, courses })
        );
      })
      .catch((err) => next(err));
  }


  //[POST] /admin/addStudent
  async addStudent(req, res, next) {
    //     if (!("courses" in req.body))
    //         req.body.courses = [];
    //    // const listIdCourses = req.body.courses
    //     let listIdCourses = [];

    //     typeof req.body.courses === "string"
    //       ? (listIdCourses.push(req.body.courses.split("-")[0]))
    //       : (listIdCourses = req.body.courses.map(
    //           (item) => item.split("-")[0]
    //         ));
    //     req.body.listIdCourses = listIdCourses;

    const listStudent = await Student.find({ email: req.body.email });

    if (!listStudent.length) {
      const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });

      Student.create(student)
        .then(() => res.redirect('/admin/management-student'))
        .catch((err) => next(err));
    } else {
      return res.redirect('back');
    }
  }

  //[PUT] /admin/editStudent
  editStudent(req, res, next) {
    if (!('courses' in req.body)) req.body.courses = [];
    // const listIdCourses = req.body.courses
    let listCourses = [];

    typeof req.body.courses === 'string'
      ? listCourses.push({
          idCourse: req.body.courses.split('-')[0],
          nameCourse: req.body.courses.split('-')[1],
        })
      : (listCourses = req.body.courses.map(function (item) {
          const idCourse = item.split('-')[0];
          const nameCourse = item.split('-')[1];
          const course = { idCourse, nameCourse };
          return course;
        }));
    req.body.listCourses = listCourses;
    const listIdCourses = listCourses.map((item) => item.idCourse);

    const updateData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      listCourses: listCourses,
    };

    Course.updateMany(
      { _id: listIdCourses },
      { $addToSet: { listStudent: req.body.id } }
    )
      .then()
      .catch((err) => next(err));

    Student.findByIdAndUpdate(req.body.id, updateData)
      .then(() => res.redirect('/admin/management-student'))
      .catch((err) => next(err));

    //console.log(listIdCourses)
    //console.log(updateData)
    //res.json(req.body)
  }

  //[DELETE] /admin/deleteStudent
  deleteStudent(req, res, next) {
    Course.updateMany(
      { listStudent: req.body.id },
      { $pull: { listStudent: req.body.id } }
    )
      .then()
      .catch((err) => next(err));

    Student.findByIdAndDelete(req.body.id)
      .then(() => res.redirect('/admin/management-student'))
      .catch((err) => next(err));
  }

  async student(req, res, next) {
    const student = await Student.findById(req.params.id).populate('listCourses.idCourse');
    const requireCourses = await Course.find({}, null, { sort: { createdAt: -1 }, limit: 4 });
    //console.log(req)
    res.render(path.join('student', 'student'), { student, requireCourses})
  }
}

module.exports = new StudentController();
