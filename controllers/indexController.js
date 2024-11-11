const { catchAsyncErrors } = require("../middlewares/catchAsyncErrors");
const Student = require("../models/studentModel");
const Internship = require("../models/internshipModel");
const Job = require("../models/jobModel");
const ErrorHandler = require("../utils/ErrorHandler");
const { sendmail } = require("../utils/nodemailer");
const { sendtoken } = require("../utils/SendToken");
const path = require('path');
const imagekit = require("../utils/imagekit").initImageKit()

exports.homepage = catchAsyncErrors(async (req, res, next) => {
    res.json({ message: "Secure homepage!" });
});

exports.currentUser = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    res.json({ student });
});

exports.studentsignup = catchAsyncErrors(async (req, res, next) => {
    const student = await new Student(req.body).save();
    sendtoken(student, 201, res);
});

exports.studentsignin = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).select("+password").exec();
    if (!student) return next(new ErrorHandler('User not found with this email address', 404));
    const isMatch = student.comparepassword(req.body.password);
    if (!isMatch) return next(new ErrorHandler("Wrong Credentials", 500));
    sendtoken(student, 200, res);
})

exports.studentsignout = catchAsyncErrors(async (req, res, next) => {
    res.clearCookie("token");
    res.json({ message: "Signout successful!" });
});

exports.studentsendmail = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findOne({ email: req.body.email }).exec();

    if (!student) return next(new ErrorHandler('User not found with this email address', 404));

    const url = `${req.protocol}://${req.get("host")}/student/forget-link/${student._id}`;
    sendmail(req, res, next, url);
    student.resetPasswordToken = "1";
    await student.save();

    res.json({ student, url });
});

exports.studentforgetlink = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();

    if (!student) return next(new ErrorHandler('User not found with this email address', 404));

    if (student.resetPasswordToken == "1") {
        student.resetPasswordToken = "0"
        student.password = req.body.password;
        await student.save();
    } else {
        return next(new ErrorHandler('Invalid Reset Password Link! Please Try Again...', 500));
    }

    res.status(200).json({
        message: 'Password has been changed successfully!',
    })
});

exports.studentresetpassword = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec()
    student.password = req.body.password;
    await student.save();
    sendtoken(student, 201, res);
});

exports.studentupdate = catchAsyncErrors(async (req, res, next) => {

    await Student.findByIdAndUpdate(req.params.id, req.body).exec();
    res.status(200).json({
        success: true,
        message: "Student updated successfully!",
    })
});

exports.studentavatar = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.params.id).exec();
    const file = req.files.avatar;
    const modifiedFileName = `resumebuilder-${Date.now()}${path.extname(file.name)}`;

    if(student.avatar.fileId !== ""){
        await imagekit.deleteFile(student.avatar.fileId);
    }

    const { fileId, url } = await imagekit.upload({
        file: file.data,
        fileName: modifiedFileName,
    });

    student.avatar = { fileId, url };
    await student.save();

    res.status(200).json({
        success: true,
        message: "Student avatar updated successfully!",
    });
});

// ---------------Apply Internship-----------------
exports.applyinternship = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const internship = await Internship.findById(req.params.internshipid).exec();

    student.internships.push(internship._id);
    internship.students.push(student._id);
    await student.save();
    await internship.save();
    
    res.json({ student, internship });
});

// ---------------Apply Job-----------------
exports.applyjob = catchAsyncErrors(async (req, res, next) => {
    const student = await Student.findById(req.id).exec();
    const job = await Job.findById(req.params.jobid).exec();

    student.jobs.push(job._id);
    job.students.push(student._id);
    await student.save();
    await job.save();
    
    res.json({ student, job });
});

