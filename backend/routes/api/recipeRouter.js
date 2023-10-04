import express from 'express';
import fs from 'fs';
import { User, Recipe, Ingredient, RecipeIngredient } from '../../db/models';
import jwt from 'jsonwebtoken';
import authenticate from '../../utils/auth';
import db from '../../db/models/index';
import upload from '../../uploadFile';
import { requestBodyValidation, paramsValidation } from '../../utils/validation';
const { Op } = require("sequelize");
const jwtSecret = require('../../db/config/config').jwtConfig.secret;
const recipeRoute = express.Router();

recipeRoute.route("/")
    .all((req, res, next) => {
        //irrespective of the method type, this all method is executed first and then it is passed to the specifc method type that it is called.
        next();
    })

    //include pagination for search (limit and offset) - external API also has offset parameter
    /* Pass the page number as a query parameter ?page=1 = > this will return the first limit number of rows as result
       External API also has offset as optional parameter
    include validations for query parameters
    */
    //check for the type of the data passed as query parameter

    .get(async (req, res, next) => {
        console.log('inside get');
        console.log(req.query);
        const searchError = paramsValidation(req.query, 'queryParams');
        const pageError = paramsValidation(req.query, 'queryParams');
        if (searchError || pageError) {
            res.statusCode = 400;
            let errObj = { "Error": `Validation Error - Route Parameter- ${(searchError && searchError.message) || (pageError && pageError.message)}` };
            res.json(errObj);
        } else {
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
                            attributes: ['firstName', 'lastName', 'userName', 'id']
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
                    attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'id', 'image'],
                });
                if (recipeObj.length === 0) {
                    res.statusCode = 404;
                    let errObj = { "Error": "Recipe with the given Recipe name doesn't exist" };
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
                let errObj = { "Error": `Internal Server Error ${error}` }
                res.json(errObj);
            }
        }
    })

    //when one of the query doesn't work, that condition needs to be handled

    //  When a data is submitted to create a recipe, the followings APIs has to be called:
    // 1.The JSON schema - input is validated
    // 2.Create request
    //     -> to Recipe table
    //     -> create entries in Ingredient table if not present
    //     -> create entries in RecipeIngredient table
    .post(authenticate, upload.single('recipeImg'), async (req, res, next) => {
        console.log(req.body.recipeBody);
        let jsonRecipeFormat = JSON.parse(req.body.recipeBody);
        console.log(jsonRecipeFormat);
        const error = requestBodyValidation(jsonRecipeFormat, 'recipeSchema');
        if (error) {
            res.statusCode = 400;
            let errObj = { "Error": `Validation Error - ${error.message}` };
            res.json(errObj);
        } else {
            /*
            1.First get the user details based on the username attached to the request
            2.Verify the userId in the req body is equal to the userId of the aunthenticated USer
            3.To the User create Recipe - await User.createRecipe(<recipe object from req Body>)
            4.Fecth the Ingredient id of all Ingredients using Op.or operator with attributes only ids - returns an array of ingredients
            5.then many-to-many association - use  await Recipe.addIngredients([array of ingredient ids] )
            6.Return the recipe Object created as json
            */
            try {
                const currUser = await User.findOne({
                    where: {
                        userName: req.userName
                    },
                    attributes: ['firstName', 'lastName', 'userName', 'id']
                });
                const recipeRequest = { ...jsonRecipeFormat };
                if (currUser.id === recipeRequest.userId) {
                    let fileName = req.file.filename;
                    let newRecipe = await currUser.createRecipe({
                        title: recipeRequest.title,
                        cuisine: recipeRequest.cuisine,
                        servings: recipeRequest.servings,
                        isPublic: recipeRequest.isPublic,
                        instruction: recipeRequest.instruction,
                        image: fileName
                    });
                    const ingredientList = recipeRequest.ingredients;
                    for (let i = 0; i < ingredientList.length; i++) {
                        const currIngredient = ingredientList[i];
                        const ingredientDetail = await Ingredient.findOne({
                            where: {
                                name: currIngredient.name
                            }
                        });
                        await newRecipe.addIngredient(ingredientDetail, {
                            through: {
                                'quantity': currIngredient.quantity,
                                'unit': currIngredient.unit
                            }
                        });
                    }
                    res.statusCode = 201;
                    const newRecipeObj = await Recipe.findByPk(newRecipe.id, {
                        include: [
                            {
                                model: User,
                                'sttributes': ['firstName', 'lastName', 'userName', 'id']
                            }, {
                                model: Ingredient,
                                attributes: ['name'],
                                through: { attributes: ['unit', 'quantity'] }
                            },
                        ],
                        'attributes': ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'image', 'id']
                    });
                    res.json(newRecipeObj);

                } else {
                    res.statusCode = 400;
                    let errObj = { "Error": "The userId in the request and the current user doesn't match" };
                    res.json(errObj);
                }
            }
            catch (error) {
                res.statusCode = 500;
                let errObj = { "Error": `Internal Server Error ${error}` }
                res.json(errObj);
            }
        }
    });

recipeRoute.all('/', (req, res) => {
    res.statusCode = 405;
    let errObj = { "Error": "Method not allowed" }
    res.json(errObj);
});


recipeRoute.get('/myRecipes', authenticate, async (req, res, next) => {
    let currUserName = req.userName; //username is appended to the request by authenticate middleware
    console.log('User name');
    console.log(currUserName);
    console.log(req.query)
    const error = paramsValidation(req.query, 'queryParams');
    if (error) {
        res.statusCode = 400;
        let errObj = { "Error": `Validation Error - Query Parameter- ${error.message}` };
        res.json(errObj);
    } else {
        let limit = 4;
        let pageNumber = (req.query.page === undefined || req.query.page < 1) ? 1 : req.query.page;
        try {
            const user = await User.findOne({
                where: {
                    userName: currUserName
                }
            });
            if (user !== null) {
                const recipeObj = await Recipe.findAll({
                    limit: limit,
                    offset: (pageNumber - 1) * limit,
                    include: {
                        model: User,
                        attributes: ['firstName', 'lastName', 'userName']
                    },
                    include: [
                        {
                            model: User,
                            attributes: ['firstName', 'lastName', 'userName']
                        },
                        {
                            model: Ingredient,
                            attributes: ['name'],
                            through: { attributes: ['unit', 'quantity'] }
                        }
                    ],
                    where: { userId: user.id },
                    attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'image', 'id']

                });
                if (recipeObj === null || recipeObj.length === 0) {
                    res.statusCode = 404;
                    let errObj = { "Error": "No Recipes to display" };
                    res.json(errObj);
                } else {
                    res.statusCode = 200;
                    res.json(recipeObj);
                }
            } else {
                res.json({ "Error": "Please login to view Recipes" });
            }

        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { "Error": `Internal Server Error ${error}` }
            res.json(errObj);
        }
    }

});

recipeRoute.all('/myRecipes', (req, res) => {
    res.statusCode = 405;
    let errObj = { "Error": "Method not allowed" }
    res.json(errObj);
});

// 1.Validate if the user is logged in
// 2.If logged in:
//     The where clause by including recipes created by the user and all public recipes
// 3.else:
//     Modify the where clause by including only the recipes that are public
recipeRoute.get('/publicRecipes', async (req, res, next) => {

    let limit = 30;
    const error = paramsValidation(req.query, 'queryParams');
    if (error) {
        res.statusCode = 400;
        let errObj = { "Error": `Validation Error - Query Parameter- ${error.message}` };
        res.json(errObj);
    } else {
        let pageNumber = (req.query.page === undefined || req.query.page < 1) ? 1 : req.query.page;
        const token = req.headers['access-token'];
        let currUserName = '';
        if (token) {
            jwt.verify(token, jwtSecret, function (err, decoded) {
                if (!err) {
                    currUserName = decoded.userName;
                }
            })
        }
        let whereClause = {
            isPublic: true
        };
        if (currUserName.length !== 0) {
            const user = await User.findOne({ //find the userId
                where: {
                    userName: currUserName
                }
            });
            whereClause = {
                [Op.or]: [
                    { isPublic: true },
                    { userId: user.id }
                ]
            }
        }

        try {
            const recipeObj = await Recipe.findAll({
                limit: limit,
                offset: (pageNumber - 1) * limit,
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
                where: whereClause,
                attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'id', 'image']
            });
            if (recipeObj === null || recipeObj.length === 0) {
                res.statusCode = 404;
                let errObj = { "Error": "There are no more public recipes to display" };
                res.json(errObj);
            } else {
                res.statusCode = 200;
                res.json(recipeObj);
            }
        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { "Error": `Internal Server Error ${error}` }
            res.json(errObj);
        }
    }
});


recipeRoute.all('/publicRecipes', (req, res) => {
    res.statusCode = 405;
    let errObj = { "Error": "Method not allowed" }
    res.json(errObj);
});


recipeRoute.route("/:id")
    .all((req, res, next) => {
        const error = paramsValidation(req.params, 'routeParams');
        if (error) {
            res.statusCode = 400;
            let errObj = { "Error": `Validation Error - Route Parameter- ${error.message}` };
            res.json(errObj);
        } else {
            next();
        }
    })

    //query the recipe table and return the result along with the user details(firstname and lastname)
    .get(async (req, res, next) => {
        let recipeId = req.params.id;
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
                where: {
                    [Op.and]: [
                        { id: recipeId },
                        { isPublic: true }
                    ]
                },
                attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction']
            });
            if (recipeObj === null) {
                res.statusCode = 404;
                let errObj = { "Error": "Recipe with the given Recipe Id doesn't exist" };
                res.json(errObj);
            } else {
                res.statusCode = 200;
                res.json(recipeObj.dataValues);
            }
        }
        catch (error) {
            res.statusCode = 500;
            let errObj = { "Error": `Internal Server Error ${error}` }
            res.json(errObj);
        }


    })
    // For update Recipe:
    // 1. Validate the JSON format using the JSON recipeSchema
    // 2. Find from Recipe table if the recipe with the given id exist
    //     if present:
    //            Update the details of the Recipe table
    //            Query the ingredient table to gte the ingredient id of the ingredients in the request
    //            Query the RecipeIngredient table and get the ingredient is that are already present for this specifc Recipe
    //            Store the common ingredients, newly added and tobedeleted ingredients by comparing the ingredients fetched from the above two steps
    //         if present in both:
    //         update query
    //     if present in first:
    //         create query
    //     if present in second:
    //         delete query
    //     else:
    //         return 404 error

    .put(authenticate, upload.single('recipeImg'),
        async (req, res, next) => {
            let updateRequest = JSON.parse(req.body.recipeBody);
            console.log('Update Request');
            console.log(updateRequest);
            const error = requestBodyValidation(updateRequest, 'recipeSchema');
            if (error) {
                res.statusCode = 400;
                let errObj = { "Error": `Validation Error - ${error.message}` };
                res.json(errObj);
            } else {
                let recipeId = req.params.id;
                const recipeDetail = await Recipe.findOne({
                    where: {
                        [Op.and]: [
                            { id: recipeId },
                            { userId: updateRequest.userId }
                        ]
                    },
                });
                if (recipeDetail !== null) {
                    try {
                        let fileName = req.file.filename;
                        await recipeDetail.update({
                            title: updateRequest.title,
                            cuisine: updateRequest.cuisine,
                            servings: updateRequest.servings,
                            isPublic: updateRequest.isPublic,
                            instruction: updateRequest.instruction,
                            image: fileName
                        });
                        let ingredients = updateRequest.ingredients;

                        let oldIngredients = await RecipeIngredient.findAll({
                            where: { RecipeId: recipeId },
                            attributes: ['RecipeId', 'IngredientId', 'quantity', 'unit']
                        });

                        let newIngredients = await Promise.all(ingredients.map(async (ingredient) => {
                            let [ingredientDetail] = await Ingredient.findOrCreate({
                                where: { name: ingredient.name }
                            });
                            return { IngredientId: ingredientDetail.id, quantity: ingredient.quantity, unit: ingredient.unit };
                        }));
                        let oldIngredientsData = oldIngredients.map((old) => {
                            return old.dataValues;
                        });
                        let oldIds = oldIngredientsData.map((old) => {
                            return old.IngredientId;
                        });
                        let newIds = newIngredients.map((newElt) => {
                            return newElt.IngredientId;
                        });


                        let commonIngredients = newIngredients.filter((ingredient) => {
                            return oldIds.indexOf(ingredient.IngredientId) !== -1;
                        });
                        let newlyAddedIngredients = newIngredients.filter((ingredient) => {
                            return oldIds.indexOf(ingredient.IngredientId) === -1;
                        });
                        let toBeDeleted = oldIngredientsData.filter((old) => {
                            return newIds.indexOf(old.IngredientId) === -1;
                        });
                        console.log(newlyAddedIngredients); //created
                        console.log(commonIngredients); //updated
                        console.log(toBeDeleted); //deleted
                        await Promise.all(newlyAddedIngredients.map(async (newlyAdded) => {
                            await RecipeIngredient.create({
                                IngredientId: newlyAdded.IngredientId,
                                RecipeId: recipeId,
                                quantity: newlyAdded.quantity,
                                unit: newlyAdded.unit
                            })
                        }));
                        await Promise.all(commonIngredients.map(async (commonIngredient) => {
                            await RecipeIngredient.update({
                                quantity: commonIngredient.quantity,
                                unit: commonIngredient.unit
                            }, {
                                where: {
                                    IngredientId: commonIngredient.IngredientId,
                                    RecipeId: recipeId
                                }
                            });
                        }));
                        await Promise.all(toBeDeleted.map(async (toBeDeletedElt) => {
                            await RecipeIngredient.destroy({
                                where: {
                                    IngredientId: toBeDeletedElt.IngredientId,
                                    RecipeId: recipeId
                                }
                            });
                        }));

                    } catch (error) {
                        console.log(error);
                        res.statusCode = 500;
                        let errObj = { "Error": `Internal Server Error ${error}` }
                        res.json(errObj);
                    }
                    try {
                        const newRecipeObj = await Recipe.findByPk(recipeId, {
                            include: [
                                {
                                    model: User,
                                    attributes: ['firstName', 'lastName', 'userName', 'id']
                                },
                                {
                                    model: Ingredient,
                                    attributes: ['name'],
                                    through: { attributes: ['unit', 'quantity'] }
                                },
                            ],
                            attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction', 'image', 'id']
                        });
                        res.statusCode = 201;
                        console.log(newRecipeObj);
                        res.json(newRecipeObj);
                    }
                    catch (error) {
                        res.statusCode = 500;
                        let errObj = { "Error": `Internal Server Error ${error}` }
                        res.json(errObj);
                    }

                } else {
                    res.statusCode = 404;
                    let errObj = { "Error": "Recipe with the given id not found" };
                    res.json(errObj);
                }
            }
        })

    // 1.Check if the current user is the same as the one created
    // 2.Procedd to delete operation only when the recipe is created by current user
    // 3.delete entries in recipeIngredient table with the given id
    // 4.Delete the entry in the recipe table
    // to check if the entry in ingredient table to be deleted or not

    .delete(authenticate, async (req, res, next) => {
        let currUserName = req.userName;
        let recipeId = req.params.id;
        try {
            const user = await User.findOne({ //find the userId
                where: {
                    userName: currUserName
                }
            });
            const recipe = await Recipe.findOne({
                where: {
                    [Op.and]: [
                        { id: recipeId },
                        { userId: user.id }
                    ]
                },
            });
            if (recipe !== null) {
                let imgFileName = recipe.image;
                await RecipeIngredient.destroy({
                    where: {
                        RecipeId: recipeId
                    }
                });
                await Recipe.destroy({
                    where: {
                        id: recipeId
                    }
                });
                if (imgFileName !== null) {
                    fs.unlinkSync('uploads/' + imgFileName);
                }
                res.statusCode = 200;
                res.json({ "Data": "Successfully Deleted the Recipe" });
            } else {
                res.statusCode = 400;
                let errObj = { "Error": "Recipe - not found" };
                res.json(errObj);
            }

        } catch (error) {
            res.statusCode = 500;
            let errObj = { "Error": `Internal Server Error ${error}` }
            res.json(errObj);
        }
    })

recipeRoute.all('/:id', (req, res) => {
    res.statusCode = 405;
    let errObj = { "Error": "Method not allowed" }
    res.json(errObj);
});




export default recipeRoute;
