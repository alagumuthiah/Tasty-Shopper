import express from 'express';
import { User, Recipe, Ingredient, RecipeIngredient } from '../../db/models';
import { Validator } from 'express-json-validator-middleware';
import db from '../../db/models/index';
const { sequelize } = require("sequelize");
const recipeRoute = express.Router();

const { validate } = new Validator();

const recipeSchema = {
    type: 'object',
    required: ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'userId', 'ingredients'],
    properties: {
        title: {
            type: 'string',
            minLength: 2
        },
        cuisine: {
            type: 'string',
            enum: ['Indian', 'Mexican', 'Thai', 'Italian', 'American', 'Korean', 'Vietnamese']
        },
        servings: {
            type: 'number',
        },
        isPublic: {
            type: 'boolean'
        },
        instruction: {
            type: 'array',
        },
        userId: {
            type: 'number',
        },
        ingredients: {
            type: 'array',
            minItems: 1,
            items: {
                type: "object",
                required: ['name', 'quantity', 'unit'],
                properties: {
                    name: {
                        type: 'string',
                        minLength: 1
                    },
                    quantity: {
                        type: 'number',
                    },
                    unit: {
                        type: 'string',
                        enum: ['cup', 'teaspoon', 'tablespoon', 'ml', 'liters', 'grams', 'kilograms', 'oz', 'number']
                    }
                }
            }

        }
    }
};

recipeRoute.route("/")
    .all((req, res, next) => {
        //irrespective of the method type, this all method is executed first and then it is passed to the specifc method type that it is called.
        console.log('Recipe route all');
        next();
    })

    //include pagination for search (limit and offset) - external API also has offset parameter
    /* Pass the page number as a query parameter ?page=1 = > this will return the first limit number of rows as result
       External API also has offset as optional parameter
    include validations for query parameters
    */
    .get(async (req, res, next) => {
        console.log(req.query);
        if (req.query.name !== undefined) {
            let recipeName = req.query.name;
            let pageNumber = (req.query.page === undefined || req.query.page < 1) ? 1 : req.query.page;
            let limit = 5;
            try {
                const recipeObj = await Recipe.findAll({
                    limit: limit,
                    offset: (pageNumber - 1) * limit,
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName', 'userName']
                        },
                        {
                            model: Ingredient,
                            attributes: ['name'],
                            through: { attributes: ['unit', 'quantity'] }
                        },
                    ],
                    where: {
                        title: {
                            [Op.iLike]: `%${recipeName}%`
                        }
                    },
                    attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction']
                });
                if (recipeObj.length === 0) {
                    res.statusCode = 404;
                    let errObj = { error: "Recipe with the given Recipe name doesn't exist" };
                    res.json(errObj);
                } else {
                    res.statusCode = 200;
                    const recipeData = recipeObj.map((recipe) => {
                        return (recipe.dataValues)
                    })
                    res.json(recipeData);
                }
            }
            catch (error) {
                res.statusCode = 500;
                let errObj = { error: `Internal Server Error ${error}` }
                res.json(errObj);
            }

        } else {
            res.statusCode = 400;
            let errObj = { error: "Bad request, query paramter not passed" };
            res.json(errObj)
        }
    })

    //when one of the query doesn't work, that condition needs to be handled
    .post(validate({ body: recipeSchema }), async (req, res, next) => {

        const createRecipeIngredientTransaction = await db.sequelize.transaction();
        const createRecipeIngredientModelTrans = await db.sequelize.transaction();
        try {
            const recipeRequest = { ...req.body };

            var recipeDetails = await Recipe.create({
                title: recipeRequest.title,
                cuisine: recipeRequest.cuisine,
                servings: recipeRequest.servings,
                isPublic: recipeRequest.isPublic,
                instruction: recipeRequest.instruction,
                userId: recipeRequest.userId
            }, { transaction: createRecipeIngredientTransaction });
            var recipeId = recipeDetails.id; // id of the recipe created
            const ingredientList = recipeRequest.ingredients;
            console.log(ingredientList);
            var ingredients = await Promise.all(ingredientList.map(async (ingredient) => { //need to check if ingredient has to be part of the transaction
                let [ingredientDetail, created] = await Ingredient.findOrCreate({
                    where: { name: ingredient.name },
                    transaction: createRecipeIngredientTransaction
                });
                return { id: ingredientDetail.id, quantity: ingredient.quantity, unit: ingredient.unit };
            }));
            await createRecipeIngredientTransaction.commit();
        }
        catch (error) {
            await createRecipeIngredientTransaction.rollback();
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }

        try {
            await Promise.all(ingredients.map(async (ingredient) => {
                const recipeIngredientDetail = await RecipeIngredient.create({
                    IngredientId: ingredient.id,
                    RecipeId: recipeId,
                    quantity: ingredient.quantity,
                    unit: ingredient.unit
                }, { transaction: createRecipeIngredientModelTrans });
            }));
            await createRecipeIngredientModelTrans.commit();
            res.statusCode = 201;
            res.json(recipeDetails);
        }

        catch (error) {
            console.log(error, 'Error')
            await createRecipeIngredientModelTrans.rollback();
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }
    })

recipeRoute.route("/:id")
    .all((req, res, next) => {
        console.log('Recipe route with id as req params');
        next();
    })

    //query the recipe table and return the result along with the user details(firstname and lastname)
    .get(async (req, res, next) => {
        let recipeId = req.params.id;
        console.log('GET request ID');
        try {
            const recipeObj = await Recipe.findOne({
                include: {
                    model: User,
                    attributes: ['firstName', 'lastName', 'userName']
                },
                include: [
                    {
                        model: User,
                        attributes: ['firstName', 'lastName']
                    },
                    {
                        model: Ingredient,
                        attributes: ['name'],
                        through: { attributes: ['unit', 'quantity'] }
                    }
                ],
                where: { id: recipeId },
                attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction']
            });
            if (recipeObj === null) {
                res.statusCode = 404;
                let errObj = { error: "Recipe with the given Recipe Id doesn't exist" };
                res.json(errObj);
            } else {
                res.statusCode = 200;
                res.json(recipeObj.dataValues);
            }
        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }


    })

export default recipeRoute

/* When a data is submitted to create a recipe, the followings APIs has to be called:
1.GET API given username -> userId ( or directly have the userId data and pass it to the API)
2.CREATE (POST) API call for Recipe table - populate title, servings, cuisine, isPublic, instructions, userId fetched from the API call in Step 1 (res.rows[0]- will return the id of the resource that is created)
3.Get the newly created recipe Id
4.We can either query our ingredient table for getting the ingredient ID or already have it stored. With the ingredient id, we have other information like qty and measurement from the data payload. Insert a new row in the recipeIngredient table for every ingredient.

Using sequelize associations we can perform the create recipe query (with only the recipe and user involved)
1.Create a Recipe object using <Model_name>.create() method
2.Get the user details by using <Model_name>.findOne() method
3.Sequelize association supports various methods for every model using the association -  recipeObject.addUser(user object)
addUser() - is the method made available
*/

/* Limits and pagination can be used when we fetch recipes based on search text
// Fetch 10 instances/rows
Project.findAll({ limit: 10 });

For querying one main model and other associated models - use include option in findOne and findAll

in many-to-many relation => we can specify conditions
*/
