import { configureStore } from '@reduxjs/toolkit';
import sessionReducer from './session';

//This create a Redux store and configure Redux dev tools so that we can inspect the store while developing

export default configureStore({
    reducer: {
        isLogged: sessionReducer,
    }
});
