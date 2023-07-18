import express from 'express';
import { Op } from 'sequelize';
import { Ingredient } from '../../db/models';
import { Validator } from 'express-json-validator-middleware';
const ingredientRoute = express.Router();

const { validate } = new Validator();

const ingredientSchema = {
    type: 'object',
    required: ['name'],
    properties: {
        name: {
            type: 'string',
            minLength: 1
        },
    },
};


ingredientRoute.route("/")

    .all((req, res, next) => {
        console.log('Ths method is executed everytime');
        next();
    })

    .get(async (req, res, next) => {
        console.log(req.query);
        let ingredientObj = null;
        if (req.query.name !== undefined) { // to implemet query params validation schema
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

    /*
    To be included Error: unique constraint error, Resource already exist error
    */
    .post(validate({ body: ingredientSchema }), async (req, res, next) => {

        try {
            const ingredientObj = await Ingredient.create(req.body);
            res.statusCode = 201;
            res.json(ingredientObj.dataValues);
        }
        catch (error) {
            console.log(error);
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }
    })

    .put(async (req, res, next) => {
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
            const ingredientObj = await Ingredient.findByPk(ingredientId); // check how to exlude created and updated attributes when returning the result
            if (ingredientObj === null) {
                res.statusCode = 404;
                let errObj = { error: "Ingredient with the given Ingredient Id doesn't exist" };
                res.json(errObj);
            } else {
                res.statusCode = 200;
                res.json(ingredientObj.dataValues);
            }
        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }

    })

    .post((req, res, next) => {
        res.statusCode = 405;
        res.send('POST method is not allowed with request params');
    })

    .put(validate({ body: ingredientSchema }), async (req, res, next) => {
        try {
            await Ingredient.update(req.body, {
                where: {
                    id: req.params.id
                }
            });
            res.statusCode = 204;
            res.json();
        }
        catch (error) {
            console.log(error);
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }
    })

    .delete((req, res, next) => {
        res.statusCodeCode = 200;
        res.send('DELTE method');
    })


export default ingredientRoute;
