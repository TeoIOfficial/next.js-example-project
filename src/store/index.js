import {configureStore} from '@reduxjs/toolkit';
import {createWrapper} from 'next-redux-wrapper';
// import logger from "redux-logger";
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import utilsReducer from './slices/utilsSlice';

const preloadedState = {
	auth: {
		isLoggingIn: false,
		loginError: '',
		isLoggingOut: false,
		logoutError: '',
		isRegistering: false,
		registerError: '',
	},
	user: {
		id: null,
		name: '',
		isLoggedIn: false,
		isFetching: false,
	},
	utils: {
		theme: 'light',
		isMobile: false,
		browser: {
			name: '',
			version: null,
		}
	},
};

const store = () => {
	return configureStore({
		reducer: {
			auth: authReducer,
			user: userReducer,
			utils: utilsReducer,
		},
		// middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
		devTools: process.env.NODE_ENV !== 'production',
		preloadedState,
		// enhancers: [],
	});
};

export const wrapper = createWrapper(store);
