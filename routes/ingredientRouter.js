import express from 'express';
import bodyParser from 'body-parser';

const ingredientRoute = express.Router();

ingredientRoute.use(bodyParser.json());

ingredientRoute.route("/")

    .all((req, res, next) => {
        console.log('Ths method is executed everytime');
        next();
    })

    .get((req, res, next) => {
        res.statusCode = 200;
        res.send('GET method');
    })


export default ingredientRoute;
