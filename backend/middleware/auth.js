
const verifyToken = require("../utils/verifyToken");
async function auth(req, res, next){
    try{
        const token = req.body.token || req.headers.authorization.split(" ")[1];
        if (!token){
            return res.status(401).json({message:"Unauthorized"});
        }
        const decoded = await verifyToken(token);
        req.username = decoded.username;
        req.user = decoded.user;
        next();
    }
    catch(err){
        console.log("Unauthorized");
        return res.status(401).json({message:"Unauthorized"});
    }
}

module.exports = auth;
