import express from 'express';
import authenticate from '../../utils/auth';
import { ShoppingList, Recipe, User, Ingredient } from '../../db/models';
import { paramsValidation } from '../../utils/validation';

const shoppingListRoute = express.Router();

shoppingListRoute.route('/')
    .get(authenticate, async (req, res, next) => {
        let currUserName = req.userName;
        try {
            const user = await User.findOne({
                where: {
                    userName: currUserName
                }
            });
            const recipeData = await ShoppingList.findOne({
                where: {
                    userId: user.id
                },
                attributes: ['userId', 'recipeList']
            });
            let recipeArray = await Recipe.findAll({
                include: {
                    model: Ingredient,
                    attributes: ['name'],
                    through: { attributes: ['unit', 'quantity'] }
                },
                where: {
                    id: recipeData.recipeList
                }

            });
            res.statusCode = 200;
            res.json(recipeArray);
        }
        catch (err) {
            res.statusCode = 500;
            res.json({ "Error": "Internal Server Error" });
        }
    })

    /*
    Delete the shooping list - clears the shopping list
    Will delete the entry in the shopping List
    */
    .delete(authenticate, async (req, res, next) => {
        let currUserName = req.userName;
        try {
            const user = await User.findOne({
                where: {
                    userName: currUserName
                }
            });
            await ShoppingList.destroy({
                where: {
                    userId: user.id
                }
            });
            res.statusCode = 204;
            res.json('DELETE');
        }
        catch (err) {
            res.statusCode = 500;
            res.json({ "Error": "Internal Server Error" });
        }
    })

    .all((req, res) => {
        res.statusCode = 405;
        let errObj = { "Error": "Method not allowed" }
        res.json(errObj);
    })
/*
1.Update request - Given the recipe Id
2.Find the userId currently logged
3.Update the shoppingList table recipe list
    -> Query the recipe list - returns an array. If Shopping List for Userid doesn't exist create one.
    -> Append the recipe Id and update the shopping List entry for the current user
*/

shoppingListRoute.route("/:id")
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
    .put(authenticate, async function (req, res) {
        let currUserName = req.userName;
        try {
            const user = await User.findOne({
                where: {
                    userName: currUserName
                }
            });
            const [recipeData, created] = await ShoppingList.findOrCreate({
                where: {
                    userId: user.id
                },
                attributes: ['id', 'userId', 'recipeList']
            });
            let recipeId = req.params.id
            if (recipeData.recipeList !== null) {
                if (recipeData.recipeList.indexOf(Number(recipeId)) !== -1) {
                    res.statusCode = 400;
                    res.json({ "Error": "Recipe is already in the shopping List." })
                } else {
                    recipeData.recipeList = [...recipeData.recipeList, recipeId];
                    await recipeData.save();
                    let recipeArray = await Recipe.findAll({
                        include: {
                            model: Ingredient,
                            attributes: ['name'],
                            through: { attributes: ['unit', 'quantity'] }
                        },
                        where: {
                            id: recipeData.recipeList
                        }
                    });
                    res.statusCode = 200;
                    res.json(recipeArray);
                }
            } else {
                recipeData.recipeList = [recipeId];
                await recipeData.save();
                let recipeArray = await Recipe.findAll({
                    where: {
                        id: recipeData.recipeList
                    }
                });
                res.statusCode = 200;
                res.json(recipeArray);
            }
            // save will update the database only when the data is replaced, it doesn't update when it is mutated, so pushing an element to the array will not update the database, so we need to use spread operator

        }
        catch (err) {
            res.statusCode = 500;
            console.log(err);
            res.json({ "Error": "Internal Server Error" });
        }
    })


    /*
    1.Delete Request with Recipe Id
    2.Update the recipe List by removing the recipe Id
    */
    //Throw 404 error, when item is not found in the recipeList
    .delete(authenticate, async function (req, res) {
        let currUserName = req.userName;
        try {
            const user = await User.findOne({
                where: {
                    userName: currUserName
                }
            });
            const recipeData = await ShoppingList.findOne({
                where: {
                    userId: user.id
                },
                attributes: ['id', 'userId', 'recipeList']
            });
            let recipeId = req.params.id
            let recipeIndex = recipeData.recipeList.indexOf(Number(recipeId));
            let newRecipeList = [...recipeData.recipeList];
            if (recipeIndex !== -1) {
                newRecipeList.splice(recipeIndex, 1);
                recipeData.recipeList = newRecipeList;
                await recipeData.save();

            }
            let recipeArray = await Recipe.findAll({
                include: {
                    model: Ingredient,
                    attributes: ['name'],
                    through: { attributes: ['unit', 'quantity'] }
                },
                where: {
                    id: recipeData.recipeList
                }
            });
            res.statusCode = 200;
            res.json(recipeArray);
        }
        catch (err) {
            res.statusCode = 500;
            console.log(err);
            res.json({ "Error": "Internal Server Error" });
        }
    })

    .all((req, res) => {
        res.statusCode = 405;
        let errObj = { "Error": "Method not allowed" }
        res.json(errObj);
    })


export default shoppingListRoute;
