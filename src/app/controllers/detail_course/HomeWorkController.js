
const Course = require('../../models/Course');
const HomeWork = require('../../models/details_course/HomeWork');

class HomeWorkController {
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
}

module.exports = new HomeWorkController();