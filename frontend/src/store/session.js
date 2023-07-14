import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    value: false,
    userName: '',
    firstName: '',
    lastName: ''
}
export const sessionSlice = createSlice({
    name: 'isLogged',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            state.value = true
            state.userName = action.payload.userName;
            state.firstName = action.payload.firstName;
            state.lastName = action.payload.lastName;
            console.log(action.payload.firstName);
        },
        logout: (state) => {
            state.value = false;
            state.firstName = '';
            state.lastName = '';
            state.userName = '';
        }
    }
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer;
