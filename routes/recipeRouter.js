import express from 'express';
import bodyParser from 'body-parser';

const recipeRoute = express.Router();

recipeRoute.use(bodyParser.json());

recipeRoute.route("/")
    .all((req, res, next) => {
        //irrespective of the method type, this all method is executed first and then it is passed to the specifc method type that it is called.
        console.log('Recipe route all');
        next();
    })

    .get((req, res, next) => {
        res.statusCode = 200;
        res.send('GET method');
    })

export default recipeRoute
