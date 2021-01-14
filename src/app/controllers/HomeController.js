const Admin = require('../models/Admin');
const Course = require('../models/Course');
const Comment = require('../models/details_course/Comment');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');

class HomeController {
  //[GET] /
  index(req, res, next) {
    Course.find({}, null, { sort: { createdAt: -1 }, limit: 3 })
      .then((courses) => res.render('', { courses }))
      .catch((err) => next(err));
  }

  listCourses(req, res, next) {
    const session = req.session;
    console.log(session);
    Course.find({})
      .then((courses) => res.render('list-courses', { courses, session }))
      .catch((err) => next(err));
  }

  // [GET] /course/:slug
  async detailsCourse(req, res, next) {
    const course = await Course.findOne({ slug: req.params.slug }).populate(
      'youCanLearn lecture.lectureId lessons homeworks documents requirements'
    );
    course.price = new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND',
    }).format(course.price);
    course.price = course.price.slice(1) + ' đ';
    const reCourses = await Course.find({
      _id: { $nin: course._id },
      categories: course.categories,
    }).limit(3);
    //console.log(reCourses)

    const comments = await Comment.find({ idCourse: course._id }).populate(
      'idUser'
    );

    if (req.session.role == 0) {
      const student = await Student.findById(req.session.studentId);
      return res.render('detailt-course', {
        course,
        reCourses,
        student,
        comments,
      });
      console.log(student);
    }

    res.render('detailt-course', { course, reCourses, comments });
  }

  login(req, res, next) {
    res.render('login');
  }

  logout(req, res, next) {
    req.session.destroy(() => res.redirect('/'));
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
      .then(() => res.redirect('/auth/login'))
      .catch((err) => {
        res.redirect('/auth/register');
        next(err);
      });
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
        res.redirect(`/student`);
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
        res.redirect(`/lecture`);
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
        res.redirect(`/admin`);
      } else {
        return res.redirect('back');
      }
    }
  }
}

module.exports = new HomeController();
