
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/', homeController.index);
router.get('/auth/login', homeController.login);
router.get('/auth/register', homeController.register);
router.get('/auth/forgot-password', homeController.forgotPassword);

router.post('/auth/login', homeController.checkLogin)

router.post('/auth/create-account', homeController.createAcc);

router.get('/courses', homeController.listCourses);
router.get('/courses/:slug', homeController.detailsCourse);



module.exports = router;