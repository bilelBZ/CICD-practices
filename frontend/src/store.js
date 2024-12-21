import { configureStore } from '@reduxjs/toolkit';
import itemsReducer from './reducers';

export const store = configureStore({
    reducer: {
        items: itemsReducer,
    },
});