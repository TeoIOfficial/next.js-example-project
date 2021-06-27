import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
// import logger from "redux-logger";
import authReducer from './slices/authSlice';
import utilsReducer from './slices/utilsSlice';

const store = configureStore({
	reducer: {
		auth: authReducer,
		utils: utilsReducer,
	},
	// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
	devTools: process.env.NODE_ENV !== 'production',
	// preloadedState: {},
	// enhancers: [],
});

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export const wrapper = createWrapper(() => store);
