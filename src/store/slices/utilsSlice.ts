import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import cookie from 'js-cookie';

const name = 'utils';

const initialState = {
	theme: 'light',
	isMobile: false,
	browser: {
		name: '',
		version: null,
	},
};

export const changeTheme = createAsyncThunk(`${name}/changeTheme`, async (theme, {getState}) => {
	let currentTheme = getState().utils.theme;

	let newTheme = '';

	if (theme) {
		if (currentTheme === theme) return;
		newTheme = theme;
	} else {
		if (currentTheme === 'light') newTheme = 'dark';
		if (currentTheme === 'dark') newTheme = 'light';
	}

	cookie.set('theme', newTheme, {
		expires: 1,
		path: '/',
	});

	return newTheme;
});

export const utilsSlice = createSlice({
	name,
	initialState,
	reducers: {
		setTheme: (state, {payload}) => {
			if (payload && payload !== state.theme) state.theme = payload;
		},
		setIsMobile: (state, {payload}) => {
			state.isMobile = payload;
		},
		setBrowser: (state, {payload}) => {
			state.browser = {
				name: payload.name,
				version: payload.version,
			};
		},
	},
	extraReducers: {
		[HYDRATE]: state => {
			return {
				...state,
			};
		},
		[changeTheme.fulfilled]: (state, {payload}) => {
			state.theme = payload;
		},
	},
});

export const {setTheme, setIsMobile, setBrowser} = utilsSlice.actions;

export const selectUtils = state => state[name];

export default utilsSlice.reducer;
