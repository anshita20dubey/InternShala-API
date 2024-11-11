const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const employeModel = new mongoose.Schema(
    {
        firstname: {
            type: String,
            required: [true, "First Name is required"],
            minLength: [4, "First name should be at least 4 characters"]
        },

        lastname: {
            type: String,
            required: [true, "Last Name is required"],
            minLength: [4, "Last name should be at least 4 characters"]
        },

        contact: {
            type: String,
            required: [true, "Contact is required"],
            maxLength: [10, "Contact must not exceed 10 characters"],
            minLength: [10, "Contact should be at least 10 characters"],
        },

        email: {
            type: String,
            required: [true, "Email is required"],
            unique: true,
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },

        password: {
            type: String,
            select: false,
            maxLength: [
                15, "Password should not exceed more than 15 characters"
            ],
            minLength: [
                6, "Password should have at least 6 characters"
            ],
            // match: []
        },

        resetPasswordToken: {
            type: String,
            default: "0",
        },

        organizationname: {
            type: String,
            required: [true, "Organization Name is required"],
            minLength: [4, "Organization Name should be at least 4 characters"]
        },

        organizationlogo: {
            type: Object,
            default:{
                fileId: "",
                url: "https://media.istockphoto.com/id/1389898060/photo/young-support-woman-cute-iconic-character-3d-rendering.jpg?s=1024x1024&w=is&k=20&c=ueQt91mVW2oEAwi3QQMuhCdo0AWa7zQcGlr3FDGka04=",
            }
        },

        internships: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'internship'}
        ],
        jobs: [
            { type: mongoose.Schema.Types.ObjectId, ref: 'job'}
        ],
        
    },
    { timestamps: true }
);

employeModel.pre('save', function () {
    if (!this.isModified("password")) {
        return;
    }

    let salt = bcrypt.genSaltSync(10);
    this.password = bcrypt.hashSync(this.password, salt);
});

employeModel.methods.comparepassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};

employeModel.methods.getjwttoken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRE,
    })
}


const Employe = mongoose.model('employe', employeModel);

module.exports = Employe;