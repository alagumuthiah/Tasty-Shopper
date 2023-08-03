import express from 'express';
import authenticate from '../../auth';
import { ShoppingList, Recipe, User } from '../../db/models';

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
    });
/*
1.Update request - Given the recipe Id
2.Find the userId currently logged
3.Update the shoppingList table recipe list
    -> Query the recipe list - returns an array. If Shopping List for Userid doesn't exisit create one.
    -> Append the recipe Id and update the shopping List entry for the current user
*/

shoppingListRoute.route("/:recipeId")
    .all((req, res, next) => {
        let idNumber = parseInt(req.params.recipeId);
        console.log(idNumber);
        if (req.params.recipeId === undefined || isNaN(idNumber)) {
            res.statusCode = 400;
            let errObj = { "Error": "Bad request query parameter not passed" }
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
            let recipeId = req.params.recipeId
            if (recipeData.recipeList !== null) {
                if (recipeData.recipeList.indexOf(Number(recipeId)) !== -1) {
                    res.statusCode = 400;
                    res.json({ "Error": "Recipe is already in the shopping List." })
                } else {
                    recipeData.recipeList = [...recipeData.recipeList, recipeId];
                    await recipeData.save();
                    let recipeArray = await Recipe.findAll({
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
            let recipeId = req.params.recipeId
            let recipeIndex = recipeData.recipeList.indexOf(Number(recipeId));
            let newRecipeList = [...recipeData.recipeList];
            if (recipeIndex !== -1) {
                newRecipeList.splice(recipeIndex, 1);
                recipeData.recipeList = newRecipeList;
                await recipeData.save();

            }
            let recipeArray = await Recipe.findAll({
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
    });


export default shoppingListRoute;
