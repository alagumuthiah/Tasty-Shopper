import express from 'express';
import ingredientRoute from './routes/ingredientRouter';
import recipeRoute from './routes/recipeRouter';

const app = express();

app.use("/recipes",recipeRoute);
app.use("/ingredients",ingredientRoute);

app.listen(3000, () => { console.log('Server listening') });
