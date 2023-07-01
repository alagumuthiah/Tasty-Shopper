import { createSlice } from '@reduxjs/toolkit';

export const sessionSlice = createSlice({
    name: 'isLogged',
    initialState: {
        value: false,
    },
    reducers: {
        login: (state) => {
            state.value = true
        },
        logout: (state) => {
            state.value = false
        }
    }
})

export const { login, logout } = sessionSlice.actions

export default sessionSlice.reducer;
