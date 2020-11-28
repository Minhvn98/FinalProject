const path = require('path');
const { findByIdAndUpdate } = require('../models/Course');

const Course = require('../models/Course');
const Comment = require('../models/details_course/Comment');
const Document = require('../models/details_course/Document');
const HomeWork = require('../models/details_course/HomeWork');
const Lesson = require('../models/details_course/Lesson');
const YouCanLearn = require('../models/details_course/YouCanLearn');

class DetailCourseController {
  //[Get] /lecture/courses/:slug
  detailCourse(req, res, next) {
    console.log(req.params.slug);
    Course.findOne({ slug: req.params.slug })
      .populate('youCanLearn lecture.lectureId lessons homeworks documents')
      // .then((data) => res.json(data))
      .then((course) =>
        res.render(path.join('lecture', 'lecture-detail-course'), { course })
      )
      .catch((err) => next(err));
    //res.render(path.join("lecture", "lecture-detail-course"));
  }

  //[POST] /lesson/courses/addYouCanLearn
  async addYouCanLearn(req, res, next) {
    const youCanLearn = new YouCanLearn({
      idCourse: req.body.idCourse,
      content: req.body.content,
    });

    const course = await Course.findById(youCanLearn.idCourse);
    await course.youCanLearn.push(youCanLearn._id);
    await course.save();
    console.log(course.slug);

    YouCanLearn.create(youCanLearn)
      .then((data) => res.redirect('back'))
      .catch((err) => next(err));
  }

  //[PUT] /lecture/editYouCanLearn
  editYouCanLearn(req, res, next) {
    YouCanLearn.findByIdAndUpdate(req.body.id, { content: req.body.content })
      .then((data) => res.redirect('back'))
      .catch((err) => next(err));
  }

  //[DELETE] /lecture/deleteYouCanLearn
  async deleteYouCanLearn(req, res, next) {
    //res.json(req.body)
    const course = await Course.findById(req.body.idCourse);
    await course.youCanLearn.pull(req.body.id);
    await course.save();

    await YouCanLearn.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
  }

  //[POST] /lecture/courses/addLesson
  async addLesson(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '/');

    const lesson = new Lesson({
      idCourse: req.body.idCourse,
      title: req.body.title,
      path: req.body.path,
    });

    //console.log(lesson)
    const course = await Course.findById(req.body.idCourse);
    await course.lessons.push(lesson._id);
    await course.save();

    Lesson.create(lesson)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
    console.log('Add lesson success!!!');
  }

  //[PUT] /lecture/courses/editLesson
  async editLesson(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = req.body.oldPath);

    const lesson = {
      title: req.body.title,
      path: req.body.path,
    };

    Lesson.findByIdAndUpdate(req.body.id, lesson)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
  }

  //[DELETE] /lesson/course/deleteLesson
  async deleteLesson(req, res, next) {
    const course = await Course.findById(req.body.idCourse);
    await course.lessons.pull(req.body.id);
    await course.save();

    await Lesson.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
  }


  //[POST] /lecture/courses/addHomeWork
  async addHomeWork(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '/');

    const homeWork = new HomeWork({
      idCourse: req.body.idCourse,
      title: req.body.title,
      path: req.body.path,
    });

    const course = await Course.findById(req.body.idCourse);
    await course.homeworks.push(homeWork._id);
    await course.save();

    HomeWork.create(homeWork)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));

  }


  //[PUT] /lecture/courses/editHomeWork
  editHomeWork(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = req.body.oldPath);

    const hw = {
      title: req.body.title,
      path: req.body.path,
    };

    HomeWork.findByIdAndUpdate(req.body.id, hw)
      .then(() => res.redirect('back'))
      .catch((err) => next(err)); 
    // console.log(req.file)
    // res.json(req.body)

  }

  //[DELETE] /lecture/courses/deleteHomeWork
  async deleteHomeWork(req, res, next) {
    const course = await Course.findById(req.body.idCourse);
    await course.homeworks.pull(req.body.id);
    await course.save();

    await HomeWork.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
  }


  //[POST] /lecture/courses/addDocument
  async addDocument(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '/');

    const doc = new Document({
      idCourse: req.body.idCourse,
      title: req.body.title,
      path: req.body.path,
    });

    const course = await Course.findById(req.body.idCourse);
    await course.documents.push(doc._id);
    await course.save();

    Document.create(doc)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
    // console.log(req.file)
    // res.json(req.body)
  }


  //[PUT] /lecture/courses/editDocument
  editDocument(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = req.body.oldPath);

    const doc = {
      title: req.body.title,
      path: req.body.path,
    };

    Document.findByIdAndUpdate(req.body.id, doc)
      .then(() => res.redirect('back'))
      .catch((err) => next(err)); 
    // console.log(req.file)
    // res.json(req.body)

  }

  //[DELETE] /lecture/courses/deleteDocument
  async deleteDocument(req, res, next) {
    const course = await Course.findById(req.body.idCourse);
    await course.documents.pull(req.body.id);
    await course.save();

    await Document.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
 
   // res.json(req.body)
  }

}

module.exports = new DetailCourseController();
