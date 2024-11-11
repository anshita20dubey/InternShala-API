const express = require('express');
const router = express.Router();

const { resume, addeducation, editeducation, deleteeducation, addjob, editjob, deletejob, addintern, editintern, deleteintern, addresp, editresp, deleteresp, addcours, editcours, deletecours, addproj, editproj, deleteproj, addskil, editskil, deleteskil, addacomp, editacomp, deleteacomp } = require('../controllers/resumeController');
const { isAuthenticated } = require('../middlewares/auth');

// GET /
router.get('/', isAuthenticated, resume);

// ---------------EDUCATION-----------------

// POST /add-edu
router.post('/add-edu', isAuthenticated, addeducation);

// POST /edit-edu
router.post('/edit-edu/:eduid', isAuthenticated, editeducation);

// POST /edit-edu
router.post('/delete-edu/:eduid', isAuthenticated, deleteeducation);

// ---------------JOB-----------------

// POST /add-job
router.post('/add-job', isAuthenticated, addjob);

// POST /edit-job
router.post('/edit-job/:jobid', isAuthenticated, editjob);

// POST /edit-job
router.post('/delete-job/:jobid', isAuthenticated, deletejob);

// ---------------INTERNSHIPS-----------------

// POST /add-intern
router.post('/add-intern', isAuthenticated, addintern);

// POST /edit-intern
router.post('/edit-intern/:internid', isAuthenticated, editintern);

// POST /edit-intern
router.post('/delete-intern/:internid', isAuthenticated, deleteintern);

// ---------------RESPONSIBILITIES-----------------

// POST /add-resp
router.post('/add-resp', isAuthenticated, addresp);

// POST /edit-resp
router.post('/edit-resp/:respid', isAuthenticated, editresp);

// POST /edit-resp
router.post('/delete-resp/:respid', isAuthenticated, deleteresp);

// ---------------COURSES-----------------

// POST /add-cours
router.post('/add-cours', isAuthenticated, addcours);

// POST /edit-cours
router.post('/edit-cours/:coursid', isAuthenticated, editcours);

// POST /edit-cours
router.post('/delete-cours/:coursid', isAuthenticated, deletecours);

// ---------------PROJECTS-----------------

// POST /add-proj
router.post('/add-proj', isAuthenticated, addproj);

// POST /edit-proj
router.post('/edit-proj/:projid', isAuthenticated, editproj);

// POST /edit-proj
router.post('/delete-proj/:projid', isAuthenticated, deleteproj);

// ---------------SKILLS-----------------

// POST /add-skil
router.post('/add-skil', isAuthenticated, addskil);

// POST /edit-skil
router.post('/edit-skil/:skilid', isAuthenticated, editskil);

// POST /edit-skil
router.post('/delete-skil/:skilid', isAuthenticated, deleteskil);

// ---------------ACCOMPLISHMENTS-----------------

// POST /add-acomp
router.post('/add-acomp', isAuthenticated, addacomp);

// POST /edit-acomp
router.post('/edit-acomp/:acompid', isAuthenticated, editacomp);

// POST /edit-acomp
router.post('/delete-acomp/:acompid', isAuthenticated, deleteacomp);

module.exports = router;