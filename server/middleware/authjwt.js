const jwt = require("jsonwebtoken")

require("dotenv").config()

function authjwt(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
try{
    const username = jwt.verify(token,process.env.JWT_SECRET).username

    res.locals.username = username;
    next();
} catch(err) {
    res.status(403).json({error: "access forbidden"})
    }
}

module.exports = {authjwt}