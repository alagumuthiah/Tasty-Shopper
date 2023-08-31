import jwt from 'jsonwebtoken';
const jwtSecret = require('../db/config/config').jwtConfig.secret;

const authenticate = ((req, res, next) => {
    console.log('Authenticate');
    console.log(req.body);
    const token = req.headers['access-token'];
    console.log(token);
    if (token) {
        jwt.verify(token, jwtSecret, function (err, decoded) {
            if (err) {
                res.status(401).json({ "Error": "Unauthorized-Invalid Token" });
            } else {
                console.log(decoded);
                req.userName = decoded.userName;
                next();
            }
        })
    } else {
        res.statsCode = 403;
        res.json({ "Error": "You are not logged in yet, please login" });
    }
})


export default authenticate;
