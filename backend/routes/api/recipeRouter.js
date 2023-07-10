import express from 'express';
import bodyParser from 'body-parser';
import { User, Recipe } from '../../db/models';
const { Op } = require("sequelize");
const recipeRoute = express.Router();

recipeRoute.use(bodyParser.json());

recipeRoute.route("/")
    .all((req, res, next) => {
        //irrespective of the method type, this all method is executed first and then it is passed to the specifc method type that it is called.
        console.log('Recipe route all');
        next();
    })

    //case insensitive query needs to be handled
    .get(async (req, res, next) => {

        console.log('GET request ID');
        if (req.query.name !== undefined) {
            let recipeName = req.query.name;
            const recipeObj = await Recipe.findAll({
                include: {
                    model: User,
                    attributes: ['firstName', 'lastName']
                },
                where: {
                    title: {
                        [Op.like]: `%${recipeName}%`
                    },
                },
                attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction']
            });
            if (recipeObj === null) {
                console.log('Recipe not found');
                res.status(404);
                let errObj = { error: "Recipe with the given Recipe name doesn't exist" };
                res.json(errObj);
            } else {
                console.log('Recipe found');
                res.status(200);
                console.log(recipeObj.dataValues);
                res.json(recipeObj.dataValues);
            }
        } else {
            console.log('Query Parameter not passed');
            res.status(400);
            let errObj = { error: "Bad request, query paramter not passed" };
            res.json(errObj)
        }
    })

    .post(async (req, res, next) => {
        res.statusCode = 200;
        /*console.log(req.body);
        const recipeDetail = req.body;
        const userDetail = await User.findOne({ userId: recipeDetail.userId });
        const recipe = await Recipe.create({ title: recipeDetail.title, cuisine: 'Indian', servings: 3, UserId: userDetail.id });
        console.log(recipe);
        //const userDetail = await User.findOne({ userId: recipeDetail.userId });
        //recipe.addUser(userDetail);*/
        res.send('POST API');
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
        const recipeObj = await Recipe.findOne({
            include: {
                model: User,
                attributes: ['firstName', 'lastName']
            },
            where: { id: recipeId },
            attributes: ['title', 'cuisine', 'servings', 'isPublic', 'instruction']
        });
        if (recipeObj === null) {
            console.log('Recipe not found');
            res.status(404);
            let errObj = { error: "Recipe with the given Recipe Id doesn't exist" };
            res.json(errObj);
        } else {
            console.log('Recipe found');
            res.status(200);
            console.log(recipeObj.dataValues);
            res.json(recipeObj.dataValues);
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
