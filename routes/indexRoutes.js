const express = require('express');
const router = express.Router();

const { homepage, currentUser, studentsignup, studentsignin, studentsignout, studentsendmail, studentforgetlink, studentresetpassword, studentupdate, studentavatar, applyinternship, applyjob } = require('../controllers/indexController');
const { isAuthenticated } = require('../middlewares/auth');


// GET /
router.get('/', homepage);

// POST /student
router.post('/student', isAuthenticated, currentUser);

// POST /student/signup
router.post('/student/signup', studentsignup);

// POST /student/signin
router.post('/student/signin', studentsignin);

// GET /student/signout
router.get('/student/signout', isAuthenticated, studentsignout);

// POST /student/send-mail
router.post('/student/send-mail', studentsendmail);

// GET /student/forget-link/:studentid
router.get('/student/forget-link/:id', studentforgetlink);

// POST /student/reset-password/:studentid
router.post('/student/reset-password/:id', isAuthenticated, studentresetpassword);

// POST /student/update/:studentid
router.post('/student/update/:id', isAuthenticated, studentupdate);

// POST /student/avatar/:studentid
router.post('/student/avatar/:id', isAuthenticated, studentavatar);

// ---------------Apply Internship-----------------

// POST /student/apply/internship/:internshipid
router.post('/student/apply/internship/:internshipid', isAuthenticated, applyinternship);

// ---------------Apply Job------------------------

// POST /student/apply/job/:jobid
router.post('/student/apply/job/:jobid', isAuthenticated, applyjob);

module.exports = router;