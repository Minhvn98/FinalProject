
const Course = require('../../models/Course');
const YouCanLearn = require('../../models/details_course/YouCanLearn');

class YouCanLearnController {
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

    YouCanLearn.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
  }

}

module.exports = new YouCanLearnController();


