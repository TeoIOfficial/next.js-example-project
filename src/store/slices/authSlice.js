import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import cookie from 'js-cookie';
import axios from 'axios';
import Router from 'next/router';

const name = 'auth';

const initialState = {
	isLoggingIn: false,
	loginError: '',
	isLoggingOut: false,
	logoutError: '',
	isRegistering: false,
	registerError: '',
};

export const login = createAsyncThunk(`${name}/login`, async (user = {}, {rejectWithValue}) => {
	try {
		const res = await axios.post('https://reqres.in/api/login', user);

		let token = res?.data?.token;

		if (token) {
			cookie.set('token', token, {
				expires: 1,
				path: '/',
			});

			Router.replace('/');
		}
	} catch (e) {
		let errorMessage = e?.response?.data?.error ?? 'An error occurred.';

		return rejectWithValue(errorMessage);
	}
});

export const register = createAsyncThunk(`${name}/register`, async (user = {}, {rejectWithValue}) => {
	try {
		const res = await axios.post('https://reqres.in/api/register', user);

		let token = res?.data?.token;

		if (token) {
			cookie.set('token', token, {
				expires: 1,
				path: '/',
			});

			Router.replace('/');
		}
	} catch (e) {
		let errorMessage = e?.response?.data?.error ?? 'An error occurred.';

		return rejectWithValue(errorMessage);
	}
});

export const logout = createAsyncThunk(`${name}/logout`, () => {
	cookie.remove('token', {
		expires: 1,
	});

	Router.replace('/login');
});

export const authSlice = createSlice({
	name,
	initialState,
	reducers: {},
	extraReducers: {
		[HYDRATE]: (state, {payload}) => {
			return {
				...state,
				...payload[name],
			};
		},
		[login.pending]: state => {
			state.loginError = '';
			state.isLoggingIn = true;
		},
		[login.fulfilled]: state => {
			state.isLoggingIn = false;
		},
		[login.rejected]: (state, {payload}) => {
			state.isLoggingIn = false;
			state.loginError = payload;
		},
		[register.pending]: state => {
			state.registerError = '';
			state.isRegistering = true;
		},
		[register.fulfilled]: state => {
			state.isRegistering = false;
		},
		[register.rejected]: (state, {payload}) => {
			state.isRegistering = false;
			state.registerError = payload;
		},
		[logout.pending]: state => {
			state.logoutError = '';
			state.isLoggingOut = true;
		},
		[logout.fulfilled]: state => {
			state.isLoggingOut = false;
		},
		[logout.rejected]: state => {
			state.logoutError = "Oops! We couldn't log you out.";
		},
	},
});

export const selectAuth = state => state[name];

export default authSlice.reducer;
