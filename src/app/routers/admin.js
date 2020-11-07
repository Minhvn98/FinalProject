
const express = require('express');
const router = express.Router();

const adminController = require('../controllers/AdminController');
const upload = require('../middlewares/upload.file')

router.get('/', adminController.index);
router.get('/management-lecture', adminController.managementLecture);
router.post('/addLecture', upload.single('avatarLecture'), adminController.addLecture)

module.exports = router;
 