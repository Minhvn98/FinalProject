
const path = require('path');
const Course = require('../models/Course');

class HomeController {

    //[GET] /
    index(req, res, next) {
        Course.find({}, null, { sort: {'createdAt': -1}, limit: 3 })
            .then(courses => res.render('', {courses}))
            .catch(err => next(err));
    }

    listCourses(req, res, next) {
        Course.find({})
            .then(courses => res.render('list-courses', {courses}))
            .catch(err => next(err))
    }

    detailsCourse(req, res, next) {
        Course.find({slug: req.params.slug})
            .then(courses => res.send(courses))
            .catch(err => next(err))
    }

    login(req, res, next) {
        res.render('login')
    }

    register(req, res, next) {
        res.render('resgister')
    }

    forgotPassword(req, res, next) {
        res.render('forgot-password')
    }
}

module.exports = new HomeController();