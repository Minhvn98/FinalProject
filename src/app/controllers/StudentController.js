const path = require('path');
const Lecture = require('../models/Lecture');
const Student = require('../models/Student');
const Course = require('../models/Course');
const Admin = require("../models/Admin");
const Notification = require("../models/Notification");
const Comment = require("../models/details_course/Comment");
const SubmitHomework = require("../models/details_course/SubmitHomework");
const { link } = require('fs');

class StudentController {

  //[GET] /admin/management-student
  async managementStudent(req, res, next) {
    const adminPromise = Admin.findById(req.session.adminId);
    const studentsPromise = Student.find({});
    const coursesPromise = Course.find({})

    const admin = await adminPromise;
    const students = await studentsPromise;
    const courses = await coursesPromise;

    res.render(path.join('admin', 'admin-student'), { admin, students, courses })

  }


  //[POST] /admin/addStudent
  async addStudent(req, res, next) {
 
    const listStudent = await Student.find({ email: req.body.email });

    if (!listStudent.length) {
      const student = new Student({
        name: req.body.name,
        email: req.body.email,
        phone: req.body.phone,
      });

      Student.create(student)
        .then(() => res.redirect('/admin/management-student'))
        .catch((err) => next(err));
    } else {
      return res.redirect('back');
    }
  }

  //[PUT] /admin/editStudent
  editStudent(req, res, next) {
    if (!('courses' in req.body)) req.body.courses = [];
    // const listIdCourses = req.body.courses
    let listCourses = [];

    typeof req.body.courses === 'string'
      ? listCourses.push({
          idCourse: req.body.courses.split('-')[0],
          nameCourse: req.body.courses.split('-')[1],
        })
      : (listCourses = req.body.courses.map(function (item) {
          const idCourse = item.split('-')[0];
          const nameCourse = item.split('-')[1];
          const course = { idCourse, nameCourse };
          return course;
        }));
    req.body.listCourses = listCourses;
    const listIdCourses = listCourses.map((item) => item.idCourse);

    const updateData = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      listCourses: listCourses,
    };

    Course.updateMany(
      { _id: listIdCourses },
      { $addToSet: { listStudent: req.body.id } }
    )
      .then()
      .catch((err) => next(err));

    Student.findByIdAndUpdate(req.body.id, updateData)
      .then(() => res.redirect('/admin/management-student'))
      .catch((err) => next(err));

    //console.log(listIdCourses)
    //console.log(updateData)
    //res.json(req.body)
  }

  //[DELETE] /admin/deleteStudent
  deleteStudent(req, res, next) {
    Course.updateMany(
      { listStudent: req.body.id },
      { $pull: { listStudent: req.body.id } }
    )
      .then()
      .catch((err) => next(err));

    Student.findByIdAndDelete(req.body.id)
      .then(() => res.redirect('/admin/management-student'))
      .catch((err) => next(err));
  }


  // [GET] /student/:id
  async student(req, res, next) {
    const student = await Student.findById(req.params.id).populate('listCourses.idCourse');
    const requireCourses = await Course.find({}, null, { sort: { createdAt: -1 }, limit: 4 });
    //console.log(req)
    res.render(path.join('student', 'student'), { student, requireCourses})
  }

  //[GET] /student/info/:id
  showInfo(req, res, next) {
    Student.findById(req.params.id)
      .then(student => res.render(path.join('student', 'student-info'), {student}))
      .catch(err => next(err))
    
  }

  //[GET] /student/course/:slug
  async detailCourse(req, res, next) {
    const student = await Student.findById(req.session.studentId)
    console.log(student)
    const course = await Course.findOne({ slug: req.params.slug })
      .populate(
        'youCanLearn lecture.lectureId lessons homeworks documents requirements'
      )
    const comments = await Comment.find({idCourse: course._id})
      .populate('idUser', ['avatar', 'name'])
    console.log(course)
    // res.json(comments)
    res.render(path.join('student', 'student-detail-course'), { student, comments, course })
  }

  //[POST] /student/addComment
  async addComment(req, res, next){
    const comment = new Comment({
      idUser: req.body.idUser,
      idCourse: req.body.idCourse,
      content: req.body.content,
      onModel: 'Student'
    })
    // res.json(comment)
    // console.log(req.body)
    const course = await Course.findById(req.body.idCourse);
    course.comments.push(comment._id);
    course.save();

    Comment.create(comment)
      .then(() => res.redirect('back'))
      .catch(err => next(err))

  }

  //[PUT] /student/editInfo
  editInfo(req, res, next) {
    const file = req.file;
    file
      ? (req.body.avatar = req.file.path.split('public')[1])
      : (req.body.avatar = req.body.oldAvatar);
    console.log(req.file);

    Student.findByIdAndUpdate(req.body.id, req.body)
      .then(() => res.redirect('back'))
      .catch((err) => next(err));
  }

  //[PUT] /student/changePassword
  async changePassword(req, res, next) {
    // res.json(req.body)
    const st = await Student.findById(req.body.id);

    if (st.password !== req.body.password) {
      const student = JSON.parse(JSON.stringify(st));
      student.changePassword = false;
      return res.render(path.join('student', 'student-info'), { student });
    } else {
      await Student.findByIdAndUpdate(req.body.id, {
        password: req.body.new_password,
      });
      const student = JSON.parse(JSON.stringify(st));
      student.changePassword = true;
      return res.render(path.join('student', 'student-info'), { student });
    }
  }

  //[POST] /student/submitHomework
  submitHomework(req, res, next) {
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '/');

    const hw = new SubmitHomework({
      idCourse: req.body.idCourse,
      idStudent: req.body.idStudent,
      idHomework: req.body.idHomework,
      content: req.body.content,
      path: req.body.path
    })
    
    SubmitHomework.create(hw)
      .then(() => res.redirect('back'))
      .catch(err => next(err))
  }

  //[GET] /student/homework/:id
  async homeWork(req, res, next) {
    const processStudent = Student.findById(req.params.id);
    const processHomework = SubmitHomework.find({idStudent: req.params.id}).populate('idCourse');

    const student = await processStudent;
    const homeworks = await processHomework;
    console.log(homeworks[0].idCourse.name)
    // return res.json(homeworks)
    const cc = await Course.findById('5faf33138f0a2e23f86b5be8').populate('lessons')
    // return res.json(homeworks)
    res.render(path.join('student', 'student-homework'), {student,homeworks, cc})
   
  }

  //[GET] /student/getNotification
  getNotification(req, res, next) {
    Notification.find({idUserReceived: req.session.studentId}, null, {sort: {createdAt: -1}})
      .then(data => res.json(data))
      .catch(err => next(err))
  }

  //[GET] /student/registerCourse
  async registerCourse(req, res, next){
    const processCourse =  Course.findById(req.params.id);
    const processStudent = Student.findById(req.session.studentId);

    const course = await processCourse;
    const noti = new Notification({
      idUserSend: req.session.studentId,
      idUserReceived: req.session.studentId,
      content: `Bạn đã đăng ký thành công khóa học ${course.name}`,
      link: `/student/courses/${course.slug}`
    })
    course.listStudent.addToSet(req.session.studentId)
    course.save();

    const c = {
      idCourse: course._id,
      nameCourse: course.name
    }

    const student = await processStudent;
    student.listCourses.addToSet(c)
    await student.save();

    const noti2 = new Notification({
      idUserSend: student._id,
      idUserReceived: course.lecture.lectureId,
      content: `Học viên ${student.name} đã đăng ký khóa học ${course.name}`,
      link: `/lecture/courses/${course.slug}`
    })

    Notification.create([noti, noti2])
      .then(() => console.log('Add notification success !'))
      .catch(err => next(err));

    res.redirect('/student/'+ req.session.studentId);
  }
}

module.exports = new StudentController();
