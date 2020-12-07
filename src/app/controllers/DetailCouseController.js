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
  async detailCourse(req, res, next) {
    
    console.log(req.params.slug);
    const course = await Course.findOne({ slug: req.params.slug })
      .populate(
        'youCanLearn lecture.lectureId lessons homeworks documents requirements'
      )
    const comments = await Comment.find({idCourse: course._id})
      .populate('idUser')
    // res.json(comments)
    res.render(path.join('lecture', 'lecture-detail-course'), { comments, course })
    // //res.render(path.join("lecture", "lecture-detail-course"));
    // Comment.find({idCourse: '5faf33138f0a2e23f86b5be8'})
    //   .populate('idUser')
    //   .then(d => res.json(d))
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

  //[POST] /lecture/addComment
  async addComment(req, res, next){
    const comment = new Comment({
      idUser: req.body.idUser,
      idCourse: req.body.idCourse,
      content: req.body.content,
      onModel: 'Lecture'
    })

    const course = await Course.findById(req.body.idCourse);
    course.comments.push(comment._id);
    course.save();

    Comment.create(comment)
      .then(() => res.redirect('back'))
      .catch(err => next(err))

  }
}

module.exports = new DetailCourseController();
