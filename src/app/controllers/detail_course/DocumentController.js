
const Course = require('../../models/Course');
const Document = require('../../models/details_course/Document');
const Notification = require('../../models/Notification');

class DocumentController {

  // [POST] /lecture/addDocument
  async addDocument(req, res, next) {
    const processCourse = Course.findById(req.body.idCourse);
    const file = req.file;
    file
      ? (req.body.path = req.file.path.split('public')[1])
      : (req.body.path = '#');

    const doc = new Document({
      idCourse: req.body.idCourse,
      title: req.body.title,
      path: req.body.path,
    });

    const course = await processCourse;
    await course.documents.push(doc._id);
    await course.save();

    course.listStudent.forEach(idStudent => {
      const noti = new Notification({
        idUserSend: course.lecture.lectureId,
        idUserReceived: idStudent,
        status: 1,
        content: `${course.lecture.name} đã thêm " ${doc.title} " vào khóa học ${course.name}`,
        link: '/courses/'+ course.slug
      })
      Notification.create(noti)
        .then(() => console.log('Add noti success!'))
        .catch(err => next(err))
    });

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
    const coursePromise = Course.findById(req.body.idCourse);
    Document.findByIdAndDelete(req.body.id)
      .then(() => res.redirect('back'))
      .catch(err => next(err))

    const course = await coursePromise;
    await course.documents.pull(req.body.id);
    await course.save();

  }

}

module.exports = new DocumentController();