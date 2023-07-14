import { createSlice, current } from '@reduxjs/toolkit';

const initialState = [];
export const myRecipeSlice = createSlice({
    name: 'myRecipes',
    initialState: initialState,
    reducers: {
        searchMyRecipes: (state, action) => {
            return action.payload;
        },
        resetMyRecipes: (state) => {
            console.log(current(state));
            return initialState;
        }

    }
});

export const { searchMyRecipes, resetMyRecipes } = myRecipeSlice.actions;

export default myRecipeSlice.reducer;

// My Recipes -> Recipes created by this user
// Custom Recipes -> Recipes created y the user and all other recipes created by other user that isPublic
// For custom recipes, check if the same reducer and action of myRecipes can be used
