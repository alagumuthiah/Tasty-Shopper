import express from 'express';
import ingredientRoute from './routes/api/ingredientRouter';
import recipeRoute from './routes/api/recipeRouter';
import userRoute from './routes/api/users';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import bodyParser from 'body-parser';
import { ValidationError } from 'express-json-validator-middleware';
import shoppingListRoute from './routes/api/shoppingListRouter';

const app = express();

const corsOption = {
    'exposedHeaders': 'access-token'
};

app.use(cookieParser());
app.use(cors(corsOption));
app.use(bodyParser.json());
app.use('/recipes', recipeRoute);
app.use('/ingredients', ingredientRoute);
app.use('/users', userRoute);
app.use('/shoppingList', shoppingListRoute);

app.use((error, req, res, next) => {
    console.log('inside validation error');
    console.log(typeof error);
    console.log(error);
    console.log(req.body);
    if (error instanceof ValidationError) {
        res.status(400);
        res.send({ "Error": `Form validation Error ${error.validationErrors}` });
    } else {
        console.log(error);
        console.log('Else');
    }
})

app.listen(3000, () => { console.log('Server listening') });


/*
commands to create models
npm install --save-dev sequelize-cli
npx sequelize-cli init
npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,email:string

npx sequelize-cli model:generate --name User --attributes firstName:string,lastName:string,userName:string,email:string,hashedPassword:string;

npx sequelize-cli model:generate --name Recipe --attributes title:string,cuisine:enum,servings:number,isPublic:boolean,instruction:array:string;

npx sequelize-cli model:generate --name Ingredient --attributes name:string;

npx sequelize-cli model:generate --name RecipeIngredient --attributes unit:enum,quantity:float;

npx sequelize-cli db:migrate --name <migration file>
npx sequelize-cli db:migrate:undo

To seed / populate data in the database
Generate the seed file:
npx sequelize-cli seed:generate --name <file_name>
Execute teh seed file
npx sequelize-cli db:seed --seed 20230707022240-demo-users.js
*/
