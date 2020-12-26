const path = require("path");

const Admin = require("../models/Admin");
const Course = require("../models/Course");
const Lecture = require("../models/Lecture");
const Notification = require("../models/Notification");

class CourseController {
  //[GET] /admin/management-course
  async index(req, res, next) {
    const adminPromise = Admin.findById(req.session.adminId);
    const coursesPromise = Course.find({});
    const lecturePromise = Lecture.find({}, "name");

    const admin = await adminPromise;
    const courses = await coursesPromise;
    const lectures = await lecturePromise;

    res.render(path.join("admin", "admin-course"), { admin, courses, lectures });
    console.log(req.session)

  }

  //[POST] /admin/addCourse
  async addCourse(req, res, next) {
    const file = req.file;
    file
      ? (req.body.image = req.file.path.split("public")[1])
      : (req.body.image = "#");

    const course = await new Course({
      name: req.body.name,
      categories: req.body.categories,
      description: req.body.description,
      level: req.body.level,
      lecture: {
        lectureId: req.body.lecture.split("-")[0],
        name: req.body.lecture.split("-")[1],
      },
      image: req.body.image,
      price: req.body.price,
    });

    Lecture.findByIdAndUpdate(course.lecture.lectureId, {
      $push: {
        listCourse: course._id,
      },
    })
      .then(() => {
        Course.create(course)
          .then(() => res.redirect("/admin/management-course"))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
    

    const noti = new Notification({
      idUserSend: req.session.adminId,
      idUserReceived: course.lecture.lectureId,
      content: `Bạn vừa được phân quyền giảng dạy khóa học ${course.name}`,
      link: `${course.slug}`
    })

    Notification.create(noti)
      .then(()=> console.log('tao thong bao thnah cong'))
      .catch(err => next(err))
  }

  //[PUT] /admin/editCourse
  async editCourse(req, res, next) {
    const file = req.file;
    file
      ? (req.body.image = req.file.path.split("public")[1])
      : (req.body.image = req.body.imgOld);

    const newCourse = {
      name: req.body.name,
      categories: req.body.categories,
      description: req.body.description,
      level: req.body.level,
      lecture: {
        lectureId: req.body.lecture.split("-")[0],
        name: req.body.lecture.split("-")[1],
      },
      videoId: req.body.videoId,
      image: req.body.image,
      price: req.body.price,
    };

    const oldCourse = await Course.findById(req.body.id);

    if (
      newCourse.lecture.lectureId.toString() ===
      oldCourse.lecture.lectureId.toString()
    ) {
      //await Lecture.findByIdAndUpdate()
      console.log("no update lecture");
      oldCourse
        .updateOne(newCourse)
        .exec((err, data) => res.redirect("/admin/management-course"));
    } else {
      // oldCourse.s
      const oldLecture = await Lecture.findById(oldCourse.lecture.lectureId);
      const newLecture = await Lecture.findById(newCourse.lecture.lectureId);

      await oldLecture.listCourse.pull(oldCourse._id);
      await oldLecture.save();
      await newLecture.listCourse.addToSet(oldCourse._id);
      await newLecture.save();

      Course.findByIdAndUpdate(req.body.id, newCourse)
        .then(() => res.redirect("/admin/management-course"))
        .catch((err) => next(err));
    }
    //res.json(oldCourse)

    // console.log(course);
    // res.json(course);
  }

  //[DELETE] /admin/deleteCourse
  deleteCourse(req, res, next) {
    //res.json(req.body)
    Course.findByIdAndDelete(req.body.id)
      //.then(() => res.redirect('/admin/management-course'))
      .then((course) => {
        console.log(course.lecture.lectureId);
        console.log("---------------");
        console.log(course._id);
        Lecture.findByIdAndUpdate(course.lecture.lectureId, {
          $pull: {
            listCourse: course._id,
          },
        })
          .then((data) => res.redirect("/admin/management-course"))
          .catch((err) => next(err));
      })
      .catch((err) => next(err));
  }
}

module.exports = new CourseController();
