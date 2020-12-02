const path = require('path');

const Course = require('../models/Course');
const Comment = require('../models/details_course/Comment');
const documentController = require('./detail_course/DocumentController');
const homeWorkController = require('./detail_course/HomeWorkController');
const lessonController = require('./detail_course/LessonController');
const youCanLearnController = require('./detail_course/YouCanLearnController');
const requirementController = require('./detail_course/RequirementController');
const Admin = require('../models/Admin');

class DetailCourseController {
  //[Get] /lecture/courses/:slug
  detailCourse(req, res, next) {
    console.log(req.params.slug);
    Course.findOne({ slug: req.params.slug })
      .populate(
        'youCanLearn lecture.lectureId lessons homeworks documents requirements'
      )
      // .then((data) => res.json(data))
      .then((course) =>
        res.render(path.join('lecture', 'lecture-detail-course'), { course })
      )
      .catch((err) => next(err));
    //res.render(path.join("lecture", "lecture-detail-course"));
    
  }

  //[POST] /lesson/courses/addYouCanLearn
  addYouCanLearn = youCanLearnController.addYouCanLearn;

  //[PUT] /lecture/editYouCanLearn
  editYouCanLearn = youCanLearnController.editYouCanLearn;

  //[DELETE] /lecture/deleteYouCanLearn
  deleteYouCanLearn = youCanLearnController.deleteYouCanLearn;

  //[POST] /lecture/courses/addLesson
  addLesson = lessonController.addLesson;

  //[PUT] /lecture/courses/editLesson
  editLesson = lessonController.editLesson;

  //[DELETE] /lesson/course/deleteLesson
  deleteLesson = lessonController.deleteLesson;

  //[POST] /lecture/courses/addHomeWork
  addHomeWork = homeWorkController.addHomeWork;

  //[PUT] /lecture/courses/editHomeWork
  editHomeWork = homeWorkController.editHomeWork;

  //[DELETE] /lecture/courses/deleteHomeWork
  deleteHomeWork = homeWorkController.deleteHomeWork;

  //[POST] /lecture/courses/addDocument
  addDocument = documentController.addDocument;

  //[PUT] /lecture/courses/editDocument
  editDocument = documentController.editDocument;

  //[DELETE] /lecture/courses/deleteDocument
  deleteDocument = documentController.deleteDocument;

  //[POST] /lecture/courses/addRequirement
  addRequirement = requirementController.addRequirement;

  //[PUT] /lecture/editRequirement
  editRequirement = requirementController.editRequirement;

  //[DELETE] /lecture/deleteRequirement
  deleteRequirement = requirementController.deleteRequirement;
}

module.exports = new DetailCourseController();
