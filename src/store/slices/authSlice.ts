import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import cookie from 'js-cookie';
import Router from 'next/router';
import routes from 'utils/routes';
import { RootState } from 'store';
import { i18n } from 'next-i18next';

const name: string = 'auth';

export interface AuthState {
	user: {
		id: number,
		username: string,
		avatar: string,
		isLoggedIn: boolean,
		isFetching: boolean,
	},
	isLoggingIn: boolean,
	loginErrors: {
		email: string,
		password: string,
		other: string
	},
	isRegistering: boolean,
	registerErrors: {
		email: string,
		password: string,
		repeatPassword: string,
		other: string
	},
	isLoggingOut: boolean,
	logoutError: string,
};

const initialState: AuthState = {
	user: {
		id: null,
		username: '',
		avatar: '',
		isLoggedIn: false,
		isFetching: false,
	},
	isLoggingIn: false,
	loginErrors: {
		email: '',
		password: '',
		other: ''
	},
	isLoggingOut: false,
	logoutError: '',
	isRegistering: false,
	registerErrors: {
		email: '',
		password: '',
		repeatPassword: '',
		other: ''
	},
};

export type UserData = {
	email: string,
	password: string,
	repeatPassword?: string
}

export const setAuthUser = createAsyncThunk(`${name}/setAuthUser`, async (id: number) => {

	let expensivePromise = new Promise((resolve) => {

		setTimeout(() => {

			resolve({
				id,
				username: 'common:user',
				avatar: '/images/user-avatar-default.jpg',
			})

		}, 1000);

	});

	let res = await expensivePromise;

	return res;

});

export const login = createAsyncThunk(`${name}/login`, async (data: UserData, { rejectWithValue }) => {
	
	let expensivePromise = new Promise((resolve, reject) => {

		setTimeout(() => {

			let { email, password } = data;

			if (!email && !password) {

				reject({
					other: i18n.t('common:missing_email_password'),
					email: i18n.t('common:missing_email'),
					password: i18n.t('common:missing_password')
				});

			}

			if (!email) {
					
				reject({email: i18n.t('common:missing_email')});
				
			}

			if (!password) {
			
				reject({password: i18n.t('common:missing_password')});
		
			}

			resolve('very expensive response')
			
		}, 1000);

	});
	
	try {

		let res = await expensivePromise;
		
		if (res) {

			cookie.set('token', '1', {
				expires: 1,
				path: '/',
			});

			Router.replace(routes.home[Router.locale]);

			return;

		}

		return rejectWithValue({other: i18n.t('common:login_error')})

	} catch (e) {

		return rejectWithValue(e);

	}

});

export const register = createAsyncThunk(`${name}/register`, async (data: UserData, { rejectWithValue }) => {
	
	let expensivePromise = new Promise((resolve, reject) => {

		setTimeout(() => {

			let { email, password, repeatPassword } = data;

			if (!email && !password) {

				reject({
					other: i18n.t('common:missing_email_password'),
					email: i18n.t('common:missing_email'),
					password: i18n.t('common:missing_password'),
					repeatPassword: i18n.t('common:missing_repeat_password')
				});

			}

			if (!email) {
					
				reject({email: i18n.t('common:missing_email')});
				
			}

			if (!password) {
					
				reject({password: i18n.t('common:missing_password')});
				
			}

			if (!repeatPassword) {
					
				reject({repeatPassword: i18n.t('common:missing_repeat_password')});
				
			}

			if (password !== repeatPassword) {

				reject({other: i18n.t('common:no_match_passwords')});

			}

			resolve('very expensive response')
			
		}, 1000);

	});
	
	try {

		let res = await expensivePromise;
		
		if (res) {

			cookie.set('token', '1', {
				expires: 1,
				path: '/',
			});

			Router.replace(routes.home[Router.locale]);

			return;

		}

		return rejectWithValue({other: i18n.t('common:register_error')})

	} catch (e) {

		return rejectWithValue(e);

	}

});

export const logout = createAsyncThunk(`${name}/logout`, async () => {

	let expensivePromise = new Promise((resolve) => {

		setTimeout(() => {
			
			resolve('very expensive response');

		}, 1000);

	});	

	let res = await expensivePromise;

	if (res) {

		cookie.remove('token', {
			expires: 1,
		});	

		Router.replace(routes.login[Router.locale]);
		
	}

	return;
 
});

export const authSlice = createSlice({
	name,
	initialState,
	reducers: {
		clearAuthUser: (state) => {
			state.user = {...initialState.user};
		}
	},
	extraReducers: builder => {
		builder.addCase(HYDRATE, (state, {payload}: any) => {

			return {
				...state,
				...payload[name],
			};	

		})
		builder.addCase(setAuthUser.pending, (state) => {
			state.user.isFetching = true;
		})
		builder.addCase(setAuthUser.fulfilled, (state, { payload }: any) => {
			state.user.id = payload.id;
			state.user.username = payload.username;
			state.user.avatar = payload.avatar;
			state.user.isLoggedIn = true;
			state.user.isFetching = false;
		})
		builder.addCase(setAuthUser.rejected, (state) => {
			state.user = {...initialState.user};
		})
		builder.addCase(login.pending, (state) => {
			state.loginErrors = {...initialState.loginErrors};
			state.isLoggingIn = true;
		})
		builder.addCase(login.fulfilled, (state) => {
			state.isLoggingIn = false;
		})
		builder.addCase(login.rejected, (state, {payload}: any) => {
			state.isLoggingIn = false;
			state.loginErrors = {...initialState.loginErrors, ...payload};
		})
		builder.addCase(register.pending, (state) => {
			state.registerErrors = {...initialState.registerErrors};
			state.isRegistering = true;
		})
		builder.addCase(register.fulfilled, (state) => {
			state.isRegistering = false;
		})
		builder.addCase(register.rejected, (state, {payload}: any) => {
			state.isRegistering = false;
			state.registerErrors = {...initialState.registerErrors, ...payload};
		})
		builder.addCase(logout.pending, (state) => {
			state.logoutError = '';
			state.isLoggingOut = true;
		})
		builder.addCase(logout.fulfilled, (state) => {
			state.isLoggingOut = false;
		})
		builder.addCase(logout.rejected, (state) => {
			state.logoutError = i18n.t('common:logout_error');
		})
	}
});

export const { clearAuthUser } = authSlice.actions;

export const selectAuth = (state: RootState): AuthState => state[name];

export default authSlice.reducer;
