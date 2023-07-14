import express from 'express';
import bodyParser from 'body-parser';
//import User from '../../models/user';
import jwt from 'jsonwebtoken';
import authenticate from '../../auth';
import { User } from '../../db/models';
import bcrypt from 'bcrypt';
import { secretKey, saltRounds } from '../../secret';

const userRoute = express.Router();


userRoute.use(bodyParser.json());

//Given the userId - it returns the user details
userRoute.get('/:id', async function (req, res) {
    let userId = req.params.id;
    console.log('GET request ID');
    const userObj = await User.findOne({
        where: { id: userId },
        attributes: ['firstName', 'lastName', 'userName', 'email']
    });
    if (userObj === null) {
        console.log('User not found');
        res.status(404);
        let errObj = { error: "User with the given User Id doesn't exist" };
        res.json(errObj);
    } else {
        console.log('User found');
        res.status(200);
        console.log(userObj.dataValues);
        console.log('after user');
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
//Error handling to be implemented with proper error messages

userRoute.post('/signup', async function (req, res) {
    const { userName, firstName, lastName, email, password } = req.body;
    console.log(userName, firstName, lastName, email, password);
    const currUser = await User.findOne({ where: { userName: userName }, attributes: ['userName', 'firstName', 'lastName', 'hashedPassword'] });
    if (currUser !== null) {
        res.statusCode = 403;
        //res.send(`User with the username ${username} already exist`);
        res.send("error");
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            userName: userName,
            firstName: firstName,
            lastName: lastName,
            email: email,
            hashedPassword: hashedPassword
        });
        const payload = { userName }; //claims to be used to create a JSON token
        const token = jwt.sign(payload, secretKey, {
            expiresIn: '8h'
        });
        res.cookie('token', token);
        res.statusCode = 200;
        res.send(newUser);
    }

});

//Error handling to be implemented with proper error messages
userRoute.post('/login', async function (req, res) {
    const { userName, password } = req.body;
    console.log(userName, password);
    const currUser = await User.findOne({
        where: { userName: userName },
        attributes: ['userName', 'firstName', 'lastName', 'hashedPassword']
    });
    console.log(currUser);
    if (currUser === null) {
        res.statusCode = 404;
        //res.send("User with the username doesn't exist");
        res.send("error");
    } else {
        const isMatch = await bcrypt.compare(password, currUser.hashedPassword);
        if (isMatch) {
            const payload = { userName }; //the claims defined when creating JSON token has to be passed as payload when verifying the token
            const token = jwt.sign(payload, secretKey, {
                expiresIn: '8h'
            });
            res.cookie('token', token, { httpOnly: true });
            res.statusCode = 200;
            res.send(currUser);
        } else {
            res.statusCode = 401;
            //res.send('Invalid credentials');
            res.send("error");
        }
    }


});

//Error handling to be implemented with proper error messages
userRoute.post('/logout', authenticate, function (req, res) {
    res.clearCookie('token');
    res.send('logged out');
});

export default userRoute;
