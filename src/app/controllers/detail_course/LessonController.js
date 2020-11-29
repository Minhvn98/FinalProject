
const Course = require('../../models/Course');
const Lesson = require('../../models/details_course/Lesson');

class LessonController {
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

}

module.exports = new LessonController();
