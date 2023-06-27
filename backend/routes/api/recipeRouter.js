import express from 'express';
import bodyParser from 'body-parser';

const recipeRoute = express.Router();

recipeRoute.use(bodyParser.json());

recipeRoute.route("/")
    .all((req, res, next) => {
        //irrespective of the method type, this all method is executed first and then it is passed to the specifc method type that it is called.
        console.log('Recipe route all');
        next();
    })

    .get((req, res, next) => {
        res.statusCode = 200;
        res.send('GET method');
    })

recipeRoute.route("/:id")
    .all((req, res, next) => {
        console.log('Recipe route with id as req params');
        next();
    })

    .get((req, res, next) => {
        res.statusCode = 200;
        res.send("GET :id method");
    })

export default recipeRoute

/* When a data is submitted to create a recipe, the followings APIs has to be called:
1.GET API given username -> userId ( or directly have the userId data and pass it to the API)
2.CREATE (POST) API call for Recipe table - populate title, servings, cuisine, isPublic, instructions, userId fetched from the API call in Step 1 (res.rows[0]- will return the id of the resource that is created)
3.Get the newly created recipe Id
4.We can either query our ingredient table for getting the ingredient ID or already have it stored. With the ingredient id, we have other information like qty and measurement from the data payload. Insert a new row in the recipeIngredient table for every ingredient.

*/
