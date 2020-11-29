
const Course = require('../../models/Course');
const Document = require('../../models/details_course/Document');

class DocumentController {
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

module.exports = new DocumentController();