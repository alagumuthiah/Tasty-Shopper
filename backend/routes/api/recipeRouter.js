import express from 'express';
import { User, Recipe, Ingredient, RecipeIngredient } from '../../db/models';
import { Validator } from 'express-json-validator-middleware';
import db from '../../db/models/index';
const { sequelize } = require("sequelize");
const recipeRoute = express.Router();

const { validate } = new Validator();

/*
 {
    "title":"Paruppu Payasam",
    "cuisine":"Indian",
    "servings":4,
    "isPublic":true,
    "userId": 2,
    "instructions":["Boil the mong dal","Make the jaggery syrup add coconut milk","Add the cooked dal", "Season it with nuts"]
 }
*/
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
    //, { transaction: createRecipeTransaction }
    .post(validate({ body: recipeSchema }), async (req, res, next) => {
        //console.log(req.body);
        const createRecipeTransaction = await db.sequelize.transaction();
        const createRecipeIngredientTrans = await db.sequelize.transaction();
        try {
            const recipeRequest = { ...req.body };
            const result = await db.sequelize.transaction(async (t) => {
                const recipeDetails = await Recipe.create({
                    title: recipeRequest.title,
                    cuisine: recipeRequest.cuisine,
                    servings: recipeRequest.servings,
                    isPublic: recipeRequest.isPublic,
                    instruction: recipeRequest.instruction,
                    userId: recipeRequest.userId
                });

                const recipeId = recipeDetails.id; // id of the recipe created
                console.log('Recipe id', recipeId)
                const ingredientList = recipeRequest.ingredients;

                ingredientList.map(async (ingredient) => { //need to check if ingredient has to be part of the transaction
                    console.log(ingredient);
                    const [ingredientDetail, created] = await Ingredient.findOrCreate({
                        where: { name: ingredient.name }
                    });
                    console.log(ingredient);
                    const recipeIngredientDetail = await RecipeIngredient.create({
                        IngredientId: ingredientDetail.id,
                        RecipeId: recipeId,
                        quantity: ingredient.quantity,
                        unit: ingredient.unit
                    });

                    console.log(recipeIngredientDetail.dataValues);

                    console.log(created);
                    console.log(ingredientDetail);
                    const ingredientId = ingredientDetail.dataValues.id;
                    console.log(ingredientId, recipeId, ingredient.quantity, ingredient.unit);


                })
                throw new Error('User created Error');
                res.statusCode = 200;
                res.json(recipeDetails);
            })



        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { error: `Internal Server Error ${error}` }
            res.json(errObj);
        }



        /*console.log(req.body);
        const recipeDetail = req.body;
        const userDetail = await User.findOne({ userId: recipeDetail.userId });
        const recipe = await Recipe.create({ title: recipeDetail.title, cuisine: 'Indian', servings: 3, UserId: userDetail.id });
        console.log(recipe);
        //const userDetail = await User.findOne({ userId: recipeDetail.userId });
        //recipe.addUser(userDetail);*/
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
