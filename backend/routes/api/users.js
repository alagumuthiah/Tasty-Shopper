import express from 'express';
import jwt from 'jsonwebtoken';
import authenticate from '../../auth';
import { User } from '../../db/models';
import bcrypt from 'bcrypt';
import { requestBodyValidation } from '../../utils/validation';

const userRoute = express.Router();
const jwtConfig = require('../../db/config/config').jwtConfig;

//Given the userId - it returns the user details
userRoute.get('/:id', async function (req, res) {
    let userId = req.params.id;
    const userObj = await User.findOne({
        where: { id: userId },
        attributes: ['firstName', 'lastName', 'userName', 'email']
    });
    if (userObj === null) {
        res.status(404);
        let errObj = { error: "User with the given User Id doesn't exist" };
        res.json(errObj);
    } else {
        res.status(200);
        res.json(userObj.dataValues);
    }

});

//One way hash for storing the password
/*1.We get the data from the req.body
    2.Once we get the username, we check if the username is already present in the user table
    3.If present - we need to throw already exist error
    4.If not create a new entry in the database for the user
    5.After creating an entry - create a JSON web token with expiration and set the JSON web token in the cookie
  */

//Check how the hashed password can be removed from the object in login and signup methods

userRoute.post('/signup', async function (req, res) {
    const error = requestBodyValidation(req.body, 'userSignUpSchema');
    if (error) {
        res.statusCode = 400;
        let errObj = { "Error": `Validation Error - ${error.message}` };
        res.json(errObj);
    } else {
        const { userName, firstName, lastName, email, password } = req.body;
        console.log(userName, firstName, lastName, email, password);
        const currUser = await User.findOne({ where: { userName: userName }, attributes: ['userName', 'firstName', 'lastName', 'hashedPassword', 'id'] });
        if (currUser !== null) {
            res.statusCode = 403;
            res.json({ "Error": `User with the username ${userName} already exist` });
        } else {
            try {
                const hashedPassword = await bcrypt.hash(password, parseInt(jwtConfig.saltRounds));
                const newUser = await User.create({
                    userName: userName,
                    firstName: firstName,
                    lastName: lastName,
                    email: email,
                    hashedPassword: hashedPassword
                });
                const payload = { userName }; //claims to be used to create a JSON token
                const token = jwt.sign(payload, jwtConfig.secret, {
                    expiresIn: jwtConfig.expiresIn
                });

                //res.cookie('token', token);
                res.statusCode = 200;
                res.setHeader("access-token", token);
                let resObj = {
                    "userName": newUser.userName,
                    "firstName": newUser.firstName,
                    "lastName": newUser.lastName,
                    "email": newUser.email,
                    "id": newUser.id
                }
                res.json(resObj);
            }
            catch (error) {
                res.statusCode = 500;
                let errObj = { "Error": `Internal Server Error ${error}` }
                res.json(errObj);
            }
        }
    }
});

userRoute.post('/login', async function (req, res) {
    const error = requestBodyValidation(req.body, 'userLoginSchema');
    if (error) {
        res.statusCode = 400;
        let errObj = { "Error": `Validation Error - ${error.message}` };
        res.json(errObj);
    } else {
        const { userName, password } = req.body;
        console.log(userName, password);
        const currUser = await User.findOne({
            where: { userName: userName },
            attributes: ['userName', 'firstName', 'lastName', 'hashedPassword', 'id']
        });
        console.log(currUser);
        if (currUser === null) {
            res.statusCode = 404;
            res.json({ "Error": `User with the username ${userName} doesn't exist` });
        } else {
            try {
                const isMatch = await bcrypt.compare(password, currUser.hashedPassword);
                if (isMatch) {
                    const payload = { userName }; //the claims defined when creating JSON token has to be passed as payload when verifying the token
                    const token = jwt.sign(payload, jwtConfig.secret, {
                        expiresIn: jwtConfig.expiresIn
                    });
                    // res.cookie('token', token, { httpOnly: true });
                    res.setHeader("access-token", token);
                    res.statusCode = 200;
                    let resObj = {
                        "userName": currUser.userName,
                        "firstName": currUser.firstName,
                        "lastName": currUser.lastName,
                        "id": currUser.id
                    }
                    res.json(resObj);
                } else {
                    res.statusCode = 401;
                    res.json({ "Error": "Invalid credentials" });
                }
            }
            catch (error) {
                res.statusCode = 500;
                let errObj = { "Error": `Internal Server Error ${error}` }
                res.json(errObj);
            }
        }
    }
});

//Error handling to be implemented with proper error messages
userRoute.delete('/logout', authenticate, function (req, res) {
    console.log('Inside logout');
    const token = req.headers['access-token'];
    console.log(token);
    try {
        res.setHeader("access-token", "");
        res.statusCode = 200;
        res.send('Logged out successfully');
    }
    catch (error) {
        res.statusCode = 500;
        let errObj = { "Error": `Internal Server Error ${error}` }
        res.json(errObj);
    }

});

export default userRoute;
