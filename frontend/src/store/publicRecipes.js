import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    pageNumber: 0,
    data: []
};

export const publicRecipeSlice = createSlice({
    name: 'publicRecipes',
    initialState: initialState,
    reducers: {
        fetchPublicRecipes: (state, action) => {
            let newState = {
                ...state,
                data: action.payload
            }
            return newState;
        },
        resetPublicRecipes: (state) => {
            let newState = {
                ...state,
                data: []
            }
            return newState;
        },
        setPublicRecipePageNumber: (state, action) => {
            let newState = {
                ...state,
                pageNumber: action.payload
            }
            return newState;
        },
        resetPublicRecipePageNumber: (state, action) => {
            let newState = {
                ...state,
                pageNumber: action.payload
            }
            return newState;
        }
    }
});

export const { fetchPublicRecipes, resetPublicRecipes, setPublicRecipePageNumber, resetPublicRecipePageNumber } = publicRecipeSlice.actions;

export default publicRecipeSlice.reducer;
