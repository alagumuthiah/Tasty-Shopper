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

    .post((req, res, next) => {
        res.statusCode = 201; // new resource created
        console.log('hello from post');
        res.send('POST method');
    })
    .put((req, res, next) => {
        res.statusCode = 200;
        res.send('PUT method');
    })
    .delete((req, res, next) => {
        res.statusCode = 405;
        res.send('DELETE method not allowed');
    })

ingredientRoute.route("/:id")
    .all((req, res, next) => {
        console.log('All methods for ingredient /:id');
        next();
    })

    .get((req, res, next) => {
        res.statusCode = 200;
        res.send('GET method');
    })
    .post((req, res, next) => {
        res.statusCode = 405;
        res.send('POST method is not allowed with request params');
    })

    .put((req, res, next) => {
        res.statusCode = 200;
        res.send('PUT method');
    })

    .delete((req, res, next) => {
        res.statusCode = 200;
        res.send('DELTE method');
    })




export default ingredientRoute;
