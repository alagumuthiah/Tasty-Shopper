import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    isLogged: false,
    userName: '',
    firstName: '',
    lastName: ''
}
export const sessionSlice = createSlice({
    name: 'userInfo',
    initialState: initialState,
    reducers: {
        login: (state, action) => {
            console.log(action.payload);
            return {
                ...state,
                isLogged: true,
                userName: action.payload.userName,
                firstName: action.payload.firstName,
                lastName: action.payload.lastName
            }
        },
        logout: (state) => {
            return {
                ...state,
                isLogged: false,
                userName: '',
                firstName: '',
                lastName: ''
            }
        }
    }
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer;
