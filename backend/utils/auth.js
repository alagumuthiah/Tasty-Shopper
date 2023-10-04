import jwt from 'jsonwebtoken';
const jwtSecret = require('../db/config/config').jwtConfig.secret;
import { redisClient } from '..';

const authenticate = (async (req, res, next) => {
    const token = req.headers['access-token'];
    if (token) {
        const deniedToken = await redisClient.get(`dl_${token}`);
        if (deniedToken) {
            res.statusCode = 401;
            res.json({ "Error": "Unauthorized-Invalid Token" });
        } else {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                console.log('token verified');
                if (err) {
                    res.status(401).json({ "Error": "Unauthorized-Invalid Token" });
                } else {
                    req.userName = decoded.userName;
                    req.tokenExp = decoded.exp;
                    next();
                }
            })
        }

    } else {
        res.statusCode = 401;
        res.json({ "Error": "No Token Provided" });
    }
})


export default authenticate;
