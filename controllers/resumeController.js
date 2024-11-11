const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { v4: uuidv4 } = require('uuid');

exports.resume = catchAsyncErrors(async (req, res, next) => {
    const { resume } = await Student.findById(req.id).exec();
    res.json({ message: "Secure Resume Page!!", resume });
});

// --------------EDUCATION---------------

exports.addeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.education.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "Education Added!" });
});

exports.editeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const eduIndex = student.resume.education.findIndex((i) => i.id === req.params.eduid);
    student.resume.education[eduIndex] = { ...student.resume.education[eduIndex], ...req.body },
    await student.save();
    res.json({ message: "Education Updated!" });
});

exports.deleteeducation = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filterededu = student.resume.education.filter((i) => i.id!== req.params.eduid);
    student.resume.education = filterededu;
    await student.save();
    res.json({ message: "Education Deleted!" });
});

// --------------JOB---------------

exports.addjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.job.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "job Added!" });
});

exports.editjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const jobIndex = student.resume.job.findIndex((i) => i.id === req.params.jobid);
    student.resume.job[jobIndex] = { ...student.resume.job[jobIndex], ...req.body },
    await student.save();
    res.json({ message: "job Updated!" });
});

exports.deletejob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredjob = student.resume.job.filter((i) => i.id!== req.params.jobid);
    student.resume.job = filteredjob;
    await student.save();
    res.json({ message: "job Deleted!" });
});

// ---------------INTERNSHIPS-----------------

exports.addintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.internships.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "intern Added!" });
});

exports.editintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internIndex = student.resume.internships.findIndex((i) => i.id === req.params.internid);
    student.resume.internships[internIndex] = { ...student.resume.internships[internIndex], ...req.body },
    await student.save();
    res.json({ message: "intern Updated!" });
});

exports.deleteintern = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredintern = student.resume.internships.filter((i) => i.id!== req.params.internid);
    student.resume.internships = filteredintern;
    await student.save();
    res.json({ message: "intern Deleted!" });
});

// ---------------RESPONSIBILITIES-----------------

exports.addresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.responsibilities.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "resp Added!" });
});

exports.editresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const respIndex = student.resume.responsibilities.findIndex((i) => i.id === req.params.respid);
    student.resume.responsibilities[respIndex] = { ...student.resume.responsibilities[respIndex], ...req.body },
    await student.save();
    res.json({ message: "resp Updated!" });
});

exports.deleteresp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredresp = student.resume.responsibilities.filter((i) => i.id!== req.params.respid);
    student.resume.responsibilities = filteredresp;
    await student.save();
    res.json({ message: "resp Deleted!" });
});

// ---------------COURSES-----------------

exports.addcours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.courses.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "cours Added!" });
});

exports.editcours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const coursIndex = student.resume.courses.findIndex((i) => i.id === req.params.coursid);
    student.resume.courses[coursIndex] = { ...student.resume.courses[coursIndex], ...req.body },
    await student.save();
    res.json({ message: "cours Updated!" });
});

exports.deletecours = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredcours = student.resume.courses.filter((i) => i.id!== req.params.coursid);
    student.resume.courses = filteredcours;
    await student.save();
    res.json({ message: "cours Deleted!" });
});

// ---------------PROJECTS-----------------

exports.addproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.projects.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "proj Added!" });
});

exports.editproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const projIndex = student.resume.projects.findIndex((i) => i.id === req.params.projid);
    student.resume.projects[projIndex] = { ...student.resume.projects[projIndex], ...req.body },
    await student.save();
    res.json({ message: "proj Updated!" });
});

exports.deleteproj = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredproj = student.resume.projects.filter((i) => i.id!== req.params.projid);
    student.resume.projects = filteredproj;
    await student.save();
    res.json({ message: "proj Deleted!" });
});

// ---------------SKILLS-----------------

exports.addskil = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.skills.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "skil Added!" });
});

exports.editskil = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const skilIndex = student.resume.skills.findIndex((i) => i.id === req.params.skilid);
    student.resume.skills[skilIndex] = { ...student.resume.skills[skilIndex], ...req.body },
    await student.save();
    res.json({ message: "skil Updated!" });
});

exports.deleteskil = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredskil = student.resume.skills.filter((i) => i.id!== req.params.skilid);
    student.resume.skills = filteredskil;
    await student.save();
    res.json({ message: "skil Deleted!" });
});

// ---------------ACCOMPLISHMENTS-----------------

exports.addacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    student.resume.accomplishments.push({ ...req.body, id: uuidv4() });
    await student.save();
    res.json({ message: "acomp Added!" });
});

exports.editacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const acompIndex = student.resume.accomplishments.findIndex((i) => i.id === req.params.acompid);
    student.resume.accomplishments[acompIndex] = { ...student.resume.accomplishments[acompIndex], ...req.body },
    await student.save();
    res.json({ message: "acomp Updated!" });
});

exports.deleteacomp = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const filteredacomp = student.resume.accomplishments.filter((i) => i.id!== req.params.acompid);
    student.resume.accomplishments = filteredacomp;
    await student.save();
    res.json({ message: "acomp Deleted!" });
});