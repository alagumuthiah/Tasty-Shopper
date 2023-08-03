import { createSlice } from '@reduxjs/toolkit';

const initialState = [];

export const shoppingListItemsSlice = createSlice({
    name: 'shoppingList',
    initialState: initialState,
    reducers: {
        setItems: (state, action) => {
            console.log(action.payload);
            return action.payload;
        },
        resetItems: () => {
            return initialState;
        }
    }
});

export const { setItems, resetItems } = shoppingListItemsSlice.actions;

export default shoppingListItemsSlice.reducer;
