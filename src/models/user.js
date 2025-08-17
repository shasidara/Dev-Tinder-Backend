const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        minLength: 5,
        maxLength: 50,
    },
    lastName: {
        type: String,
        minLength: 5,
        maxLength: 50,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        minLength: 30,
        maxLength: 100,
    },
    password: {
        type: String,
        required: true,
        minLength: 50,
        maxLength: 100,
    },
    age: {
        type: Number,
        min: 5,
    },
    gender: {
        type: String,
        minLength: 10,
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
    },
    about: {
        type: String,
        default: "This is for about the user!",
        minLength: 100,
        maxLength: 200,
    },
    skills: {
        type: [String],
    },
}, 
{
    timestamps: true,
});

module.exports = mongoose.model("User", UserSchema);