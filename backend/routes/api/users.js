import express from 'express';
import bodyParser from 'body-parser';
//import User from '../../models/user';
import jwt from 'jsonwebtoken';
import { secretKey } from '../../secret';
import authenticate from '../../auth';
import { User } from '../../db/models';

const userRoute = express.Router();


userRoute.use(bodyParser.json());

//One way hash for storing the password
userRoute.post('/signup', function (req, res) {
    const { username, firstName, lastName, email, password } = req.body;
    console.log(secretKey);
    console.log(username, firstName, lastName, email, password);
    /*1.We get the data from the req.body
      2.Once we get the username, we check if the username is already present in the user table
      3.If present - we need to throw already exist error
      4.If not create a new entry in the database for the user
      5.After creating an entry - create a JSON web token with expiration and set the JSON web token in the cookie
    */

    const payload = { username }; //claims to be used to create a JSON token
    const token = jwt.sign(payload, secretKey, {
        expiresIn: '8h'
    });
    res.cookie('token', token);
    console.log(token);
    res.send("Sign in");
})

userRoute.post('/login', async function (req, res) {
    const { username, password } = req.body;
    console.log(username, password);
    const currUser = await User.findOne({ where: { username: username } });
    console.log(currUser);
    if (currUser == null) {
        res.status(404);
        res.send("User with the username doesn't exist");
    } else if (currUser.password === password) {
        const payload = { username };
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

})

userRoute.post('/logout', authenticate, function (req, res) {
    console.log('log out');
    res.send('logged out');
})

export default userRoute;
