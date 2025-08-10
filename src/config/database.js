const mongoose = require("mongoose");

const connectDB = async () => {
    await mongoose.connect(
        "mongodb+srv://shasidaradev:Shasidara2006@nodepractice.fwm2ryh.mongodb.net/devTinder"
    );
};

module.exports = { connectDB };

