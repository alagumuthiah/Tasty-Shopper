import { createSlice, current } from '@reduxjs/toolkit';

const initialState = {
    pageNumber: 0,
    data: []
};
export const myRecipeSlice = createSlice({
    name: 'myRecipes',
    initialState: initialState,
    reducers: {
        fetchMyRecipes: (state, action) => {
            let newState = {
                ...state,
                data: action.payload
            };
            return newState;
        },
        resetMyRecipes: (state) => {
            console.log(current(state));
            return initialState;
        },
        setPageNumber: (state, action) => {
            let newState = {
                ...state,
                pageNumber: action.payload
            }
            console.log(newState);
            return newState;
        },
        resetPageNumber: (state) => {
            console.log(current(state));
            return initialState;
        }

    }
});

export const { fetchMyRecipes, resetMyRecipes, setPageNumber, resetPageNumber } = myRecipeSlice.actions;

export default myRecipeSlice.reducer;

// My Recipes -> Recipes created by this user
// Custom Recipes -> Recipes created y the user and all other recipes created by other user that isPublic
// For custom recipes, check if the same reducer and action of myRecipes can be used
