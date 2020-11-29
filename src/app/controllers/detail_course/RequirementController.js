
const Course = require('../../models/Course');
const Requirement = require('../../models/details_course/Requirement');

class RequirementController {
  //[POST] /lecture/courses/addRequirement
  async addRequirement(req, res, next) {
    const requirement = new Requirement({
      idCourse: req.body.idCourse,
      content: req.body.content,
    });

    const course = await Course.findById(requirement.idCourse);
    await course.requirements.push(requirement._id);
    await course.save();

    Requirement.create(requirement)
      .then((data) => res.redirect('back'))
      .catch((err) => next(err));
    //res.json(req.body)
  }

  //[PUT] /lecture/editRequirement
  editRequirement(req, res, next) {
    Requirement.findByIdAndUpdate(req.body.id, { content: req.body.content })
      .then((data) => res.redirect('back'))
      .catch((err) => next(err));
  }

  //[DELETE] /lecture/deleteRequirement
  async deleteRequirement(req, res, next) {
    const course = await Course.findById(req.body.idCourse);
    await course.requirements.pull(req.body.id);
    await course.save();

    await Requirement.findByIdAndDelete(req.body.id).exec((err, data) =>
      res.redirect('back')
    );
  }

}

module.exports = new RequirementController();