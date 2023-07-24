import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const publicRecipeSlice = createSlice({
    name: 'publicRecipes',
    initialState: initialState,
    reducers: {
        searchPublicRecipes: (state, action) => {
            return action.payload;
        },
        resetPublicRecipes: (state) => {
            return initialState;
        }
    }
});

export const { searchPublicRecipes, resetPublicRecipes } = publicRecipeSlice.actions;

export default publicRecipeSlice.reducer;
