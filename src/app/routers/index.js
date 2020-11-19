
const express = require('express');
const router = express.Router();
const homeController = require('../controllers/homeController');


router.get('/', homeController.index);
router.get('/login', homeController.login);
router.get('/register', homeController.register);
router.get('/forgot-password', homeController.forgotPassword);

router.post('/create-account', homeController.createAcc);

router.get('/courses', homeController.listCourses);
router.get('/courses/:slug', homeController.detailsCourse);



module.exports = router;