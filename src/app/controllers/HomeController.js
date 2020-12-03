const path = require('path');
const Course = require('../models/Course');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Lesson = require('../models/details_course/Lesson');
const HomeWork = require('../models/details_course/HomeWork');
const Document = require('../models/details_course/Document');
const Admin = require('../models/Admin');
const User = require('../models/User');

class HomeController {
  //[GET] /
  index(req, res, next) {
    Course.find({}, null, { sort: { createdAt: -1 }, limit: 3 })
      .then((courses) => res.render('', { courses }))
      .catch((err) => next(err));
  }

  listCourses(req, res, next) {
    Course.find({})
      .then((courses) => res.render('list-courses', { courses }))
      .catch((err) => next(err));
  }

  async detailsCourse(req, res, next) {
    // Course.findOne({ slug: req.params.slug })
    //   .then(function (course) {
    //     course.price = new Intl.NumberFormat("vi-VN", {
    //       style: "currency",
    //       currency: "VND",
    //     }).format(course.price);
    //     course.price = course.price.slice(1) + " đ";
    //     console.log(course.price);
    //     Lecture.findById(course.lecture.lectureId).then((lect) =>
    //       res.render("detailt-course", { course, lect })
    //     );
    //   })
    //   .catch((err) => next(err));

    // .then(courses => res.render('detailt-course'))
    // .catch(err => next(err))

    //     console.log(x)
    // res.json(x);

    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'youCanLearn lecture.lectureId lessons homeworks documents requirements'
    );
    course.price = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(course.price);
    course.price = course.price.slice(1) + ' đ';
    const reCourses =  await Course.find({
      _id: { $nin: course._id },
      categories: course.categories,
    }).limit(3)
    console.log(reCourses)
    res.render('detailt-course', { course, reCourses });

    // res.json(course)
  }

  login(req, res, next) {
    res.render('login');
  }

  logout(req, res, next) {
    req.session.destroy(()=> res.redirect('/'))
  }

  register(req, res, next) {
    res.render('resgister');
  }

  forgotPassword(req, res, next) {
    res.render('forgot-password');
  }

  //[POST] //create-account
  createAcc(req, res, next) {
    const student = new Student(req.body);
    Student.create(student)
      .then(() => res.redirect('/'))
      .catch((err) => next(err));
  }

  async checkLogin(req, res, next) {
    const { email, password, role } = req.body;
    console.log(`email: ${email} - pass: ${password} - role ${role}`);
    if (role === '0') {
      const student = await Student.findOne({ email: email });
      if (!student) return res.redirect('back');
      if (student.password === password) {
        req.session.studentId = student._id;
        req.session.role = role;
        res.redirect(`/student/${student._id}`);
      } else {
        return res.redirect('back');
      }
    }

    if (role === '1') {
      const lecture = await Lecture.findOne({ email: email });
      if (!lecture) return res.redirect('back');
      if (lecture.password === password) {
        req.session.lectureId = lecture._id;
        req.session.role = role;
        res.redirect(`/lecture/${lecture._id}`);
      } else {
        return res.redirect('back');
      }
    }

    if (role === '2') {
      const admin = await Admin.findOne({ email: email });
      if (!admin) return res.redirect('back');
      if (admin.password === password) {
        req.session.adminId = admin._id;
        req.session.role = role;
        res.redirect(`/admin/${admin._id}`);
      } else {
        return res.redirect('back');
      }
    }
  }
}

module.exports = new HomeController();
