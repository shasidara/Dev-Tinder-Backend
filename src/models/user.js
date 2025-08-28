const mongoose = require("mongoose");
const validator = require("validator");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 50,
    },
    lastName: {
        type: String,
        minLength: 3,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 3,
        maxLength: 100,
        validate(value) {
            if(!validator.isEmail(value)) {
                throw new Error("Invalid Email Address:" + value);
            };
        },
    },
    password: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 100,
        validate(value) {
            if(!validator.isStrongPassword(value)) {
                throw new Error("Enter a Strong Password:" + value);
            };
        },
    },
    age: {
        type: Number,
        min: 5,
    },
    gender: {
        type: String,
        minLength: 3,
        maxLength: 20,
        validate(value) {
            if(!["male", "female", "other"].includes(value)){
                throw new Error("Gender data is not valid");
            }
        },
    },
    photoURL: {
        type: String,
        default: "https://media.istockphoto.com/id/1337144146/id/vektor/vektor-ikon-profil-avatar-default.jpg?s=170667a&w=0&k=20&c=26gXDTXAEo2w4aGtmzQSaNjWcU6wSBrKgGZ-CGYJIeo=",
        validate(value) {
            if(!validator.isURL(value)){
                throw new Error("Invalid Photo URL:" + value);
            };
        },
    },
    about: {
        type: String,
        default: "This is for about the user!",
    },
    skills: {
        type: [String],
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);