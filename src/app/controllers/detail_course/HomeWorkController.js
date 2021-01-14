const Course = require('../../models/Course');
const HomeWork = require('../../models/details_course/HomeWork');
const Notification = require('../../models/Notification');

class HomeWorkController {
  //[POST] /lecture/courses/addHomeWork
  async addHomeWork(req, res, next) {
    const coursePromise = Course.findById(req.body.idCourse);
    const file = req.file;

    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '#');

    const homeWork = new HomeWork({
      idCourse: req.body.idCourse,
      title: req.body.title,
      path: req.body.path,
    });

    const course = await coursePromise;
    await course.homeworks.push(homeWork._id);
    await course.save();

    course.listStudent.forEach((idStudent) => {
      const noti = new Notification({
        idUserSend: course.lecture.lectureId,
        idUserReceived: idStudent,
        status: 1,
        content: `${course.lecture.name} đã thêm " ${homeWork.title} " vào khóa học ${course.name}`,
        link: '/courses/' + course.slug,
      });
      Notification.create(noti)
        .then(() => console.log('Add noti success!'))
        .catch((err) => next(err));
    });

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

    HomeWork.findByIdAndDelete(req.body.id)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
  }
}

module.exports = new HomeWorkController();
