import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';
import otherRecipesReducer from './otherRecipes';
import myRecipesReducer from './myRecipes';
import listIngredientsReducer from './ingredients';

//This create a Redux store and configure Redux dev tools so that we can inspect the store while developing

export default configureStore({
    reducer: {
        userInfo: sessionReducer,
        otherRecipes: otherRecipesReducer,
        myRecipes: myRecipesReducer,
        ingredients: listIngredientsReducer
    }
});
