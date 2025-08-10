const adminAuth = (req, res, next) => {
    console.log("Checking the admin auth");
    const token = "xyz";
    const isAdminAuthorized = token === "xyz";
    if(!isAdminAuthorized) {
        res.status(401).send("unauthorized token");
    } else {
        next();
    };
};

module.exports = { adminAuth};