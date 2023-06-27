import express from 'express';
import ingredientRoute from './routes/api/ingredientRouter';
import recipeRoute from './routes/api/recipeRouter';

const app = express();
app.use("/recipes", recipeRoute);
app.use("/ingredients", ingredientRoute);

app.listen(3000, () => { console.log('Server listening') });
