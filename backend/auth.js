import jwt from 'jsonwebtoken';
import { secretKey } from './secret';

const authenticate = ((req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    console.log(token);
    if (token) {
        jwt.verify(token, secretKey, function (err, decoded) {
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
