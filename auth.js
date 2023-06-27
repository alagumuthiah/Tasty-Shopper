import jwt from 'jsonwebtoken';
import { secretKey } from './secret';

const authenticate = ((req, res, next) => {
    console.log(req.cookies);
    const token = req.cookies.token;
    console.log(token);
    if (token) {
        jwt.verify(token, secretKey, function (res, err) {
            if (err) {
                res.status(401).send('Unauthorized:Invalid Token');
            } else {
                req.username = res.username;
                next();
            }
        })
    }
})

export default authenticate;
