const jwt = require("jsonwebtoken");
const accessTokenSecret = 'apC3Y9dhSjbMQzrq';

const  authenticateJWT = async (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader) {
        const token = authHeader || authHeader.split(' ')[1];

        await jwt.verify(token, accessTokenSecret, (err, decoded) => {
            if (err) {
                return res.status(403).json("Utilisateur non connecté." + err);
            }
            req.user = decoded.user.username;
            req.role = decoded.user.role;
            next();
        });
    } else {
        res.sendStatus(401);
    }
};

module.exports = authenticateJWT;