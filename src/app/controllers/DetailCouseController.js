const path = require("path");

const Course = require("../models/Course");
const Comment = require("../models/details_course/Comment");
const Document = require("../models/details_course/Document");
const HomeWork = require("../models/details_course/HomeWork");
const Lesson = require("../models/details_course/Lesson");
const YouCanLearn = require('../models/details_course/YouCanLearn')

class DetailCourseController {
  //[Get] /lecture/courses/:slug
  detailCourse(req, res, next) {
    console.log(req.params.slug)
    Course.findOne({slug: req.params.slug})
      .populate('youCanLearn')
      .then((data) => res.json(data))
      //.then((course) => res.render(path.join("lecture", "lecture-detail-course"), {course}))
      //.catch(err => next(err))
    //res.render(path.join("lecture", "lecture-detail-course"));
  }

  async addYouCanLearn(req, res, next) {
    const youCanLearn = new YouCanLearn({
      idCourse: req.body.idCourse,
      content: req.body.content
    })

    const course = await Course.findById(youCanLearn.idCourse)
    await course.youCanLearn.push(youCanLearn._id)
    await course.save();

    YouCanLearn.create(youCanLearn)
      .then((data) => res.json(data))
      .catch(err => next(err))

    

  }
}

module.exports = new DetailCourseController();
