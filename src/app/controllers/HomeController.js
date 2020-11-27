const path = require("path");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Student = require("../models/Student");
const Lesson = require("../models/details_course/Lesson");
const HomeWork = require("../models/details_course/HomeWork");
const Document = require("../models/details_course/Document");

class HomeController {
  //[GET] /
  index(req, res, next) {
    Course.find({}, null, { sort: { createdAt: -1 }, limit: 3 })
      .then((courses) => res.render("", { courses }))
      .catch((err) => next(err));
  }

  listCourses(req, res, next) {
    Course.find({})
      .then((courses) => res.render("list-courses", { courses }))
      .catch((err) => next(err));
  }

  detailsCourse(req, res, next) {
    Course.findOne({ slug: req.params.slug })
      .then(function (course) {
        course.price = new Intl.NumberFormat("vi-VN", {
          style: "currency",
          currency: "VND",
        }).format(course.price);
        course.price = course.price.slice(1) + " đ";
        console.log(course.price);
        Lecture.findById(course.lecture.lectureId).then((lect) =>
          res.render("detailt-course", { course, lect })
        );
      })
      .catch((err) => next(err));

    // .then(courses => res.render('detailt-course'))
    // .catch(err => next(err))

    //     console.log(x)
    // res.json(x);
  }

  login(req, res, next) {
    res.render("login");
  }

  register(req, res, next) {
    res.render("resgister");
  }

  forgotPassword(req, res, next) {
    res.render("forgot-password");
  }

  //[POST] //create-account
  createAcc(req, res, next) {
    const student = new Student(req.body);
    Student.create(student)
      .then(() => res.redirect("/"))
      .catch((err) => next(err));
  }
}

module.exports = new HomeController();
