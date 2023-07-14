import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

export const listIngredientsSlice = createSlice({
    name: 'ingredients',
    initialState: initialState,
    reducers: {
        listIngredients: (state, action) => {
            return action.payload;
        }
    }
});

export const { listIngredients } = listIngredientsSlice.actions;

export default listIngredientsSlice.reducer;
