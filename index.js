import express from 'express';
import ingredientRoute from './routes/api/ingredientRouter';
import recipeRoute from './routes/api/recipeRouter';
import userRoute from './routes/api/users';
import cookieParser from 'cookie-parser';

const app = express();
app.use(cookieParser());
app.use('/recipes', recipeRoute);
app.use('/ingredients', ingredientRoute);
app.use('/users', userRoute);


app.listen(3000, () => { console.log('Server listening') });
