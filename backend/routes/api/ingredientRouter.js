import express from 'express';
import bodyParser from 'body-parser';
import { Op } from 'sequelize';
import { Ingredient } from '../../db/models';

const ingredientRoute = express.Router();

ingredientRoute.use(bodyParser.json());

ingredientRoute.route("/")

    .all((req, res, next) => {
        console.log('Ths method is executed everytime');
        next();
    })

    .get(async (req, res, next) => {
        console.log(req.query);
        res.statusCode = 200;
        let ingredientObj = null;
        if (req.query.name !== undefined) { // check if there are any better method for checking if query params is present or not.
            let ingredientName = req.query.name;
            ingredientObj = await Ingredient.findOne({
                where: {
                    name: {
                        [Op.iLike]: `%${ingredientName}%`
                    }
                },
                attributes: ['id', 'name']
            });
        } else { //without query parameters query the entire table and return the result
            ingredientObj = await Ingredient.findAll({
                attributes: ['name']
            });
        }

        if (ingredientObj === null) {
            res.status(404);
            let errObj = { error: "Ingredient with the given Ingredient name doesn't exist" };
            res.json(errObj);
        } else {
            res.status(200);
            res.json(ingredientObj);
        }
    })

    .post((req, res, next) => {
        res.statusCode = 201; // new resource created
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

    .get(async (req, res, next) => {
        let ingredientId = req.params.id;
        console.log('GET request ID');
        try {
            const ingredientObj = await Ingredient.findByPk(ingredientId);
            if (ingredientObj === null) {
                res.status(404);
                let errObj = { error: "Ingredient with the given Ingredient Id doesn't exist" };
                res.json(errObj);
            } else {
                res.status(200);
                res.json(ingredientObj.dataValues);
            }
        }
        catch (error) {
            res.status(500);
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }

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
