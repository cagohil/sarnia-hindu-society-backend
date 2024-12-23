const jwt = require("jsonwebtoken");

const JWT_SECRET = "thetempleofhindu";


const fetchadmin = (req, res, next)=>{
    // Get the user from the jwt token and add id to req object

    const token = req.header('adminToken');
    if(!token){
        res.status(401).send({error: "Please authenticate using a valid token"})
    }
    try {
        const data = jwt.verify(token, JWT_SECRET);
        req.admin = data.admin;
        next()
        } catch (error) {
            res.status(401).send({error: "Please authenticate using a valid token"})
        }
}

module.exports = fetchadmin;