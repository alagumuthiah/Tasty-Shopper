import express from 'express';
import bodyParser from 'body-parser';
//import User from '../../models/user';
import jwt from 'jsonwebtoken';
import authenticate from '../../auth';
import { User } from '../../db/models';
import bcrypt, { hash } from 'bcrypt';
import { secretKey, saltRounds } from '../../secret';

const userRoute = express.Router();


userRoute.use(bodyParser.json());

//One way hash for storing the password
/*1.We get the data from the req.body
    2.Once we get the username, we check if the username is already present in the user table
    3.If present - we need to throw already exist error
    4.If not create a new entry in the database for the user
    5.After creating an entry - create a JSON web token with expiration and set the JSON web token in the cookie
  */
userRoute.post('/signup', async function (req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    console.log(username, firstName, lastName, email, password);
    const currUser = await User.findOne({ where: { username: username } });
    if (currUser != null) {
        res.status(403);
        res.send(`User with the username ${username} already exist`);
    } else {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({
            username: username,
            firstname: firstName,
            lastname: lastName,
            email: email,
            password: hashedPassword
        });
        const payload = { username }; //claims to be used to create a JSON token
        const token = jwt.sign(payload, secretKey, {
            expiresIn: '8h'
        });
        res.cookie('token', token);
        res.send(newUser);
    }

})

userRoute.post('/login', async function (req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const currUser = await User.findOne({ where: { username: username } });
    console.log(currUser);
    if (currUser == null) {
        res.status(404);
        res.send("User with the username doesn't exist");
    } else {
        const isMatch = await bcrypt.compare(password, currUser.password);
        console.log(isMatch);
        if (isMatch) {
            const payload = { username }; //the claims defined when creating JSON token has to be passed as payload when verifying the token
            const token = jwt.sign(payload, secretKey, {
                expiresIn: '8h'
            });
            res.cookie('token', token, { httpOnly: true });
            res.status(200);
            res.send('Login successful');
        } else {
            res.status(401);
            res.send('Invalid credentials');
        }
    }


})

userRoute.post('/logout', authenticate, function (req, res) {
    res.clearCookie('token');
    res.send('logged out');
})

export default userRoute;
