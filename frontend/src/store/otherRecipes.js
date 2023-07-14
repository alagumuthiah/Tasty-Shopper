import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const otherRecipeSlice = createSlice({
    name: 'otherRecipes',
    initialState: initialState,
    reducers: {
        searchOtherRecipes: (state, action) => {
            return action.payload;
        },
        resetOtherRecipes: (state) => {
            return initialState;
        }
    }
});

export const { searchOtherRecipes, resetOtherRecipes } = otherRecipeSlice.actions;

export default otherRecipeSlice.reducer;
