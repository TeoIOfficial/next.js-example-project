import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import cookie from 'js-cookie';
import { Browser } from 'utils/helpers';
import { RootState } from 'store';
import themes from 'utils/themes';

const name: string = 'utils';

export type Theme = string;

export type IsMobile = boolean;

export interface UtilsState {
	theme: Theme,
	isSettingTheme: boolean,
	isMobile: IsMobile,
	browser: Browser,
};

const initialState: UtilsState = {
	theme: themes.light,
	isSettingTheme: false,
	isMobile: false,
	browser: {
		name: '',
		version: '',
	},
};

export const setTheme = createAsyncThunk<any, Theme, {state: RootState}>(`${name}/setTheme`, async (theme, { getState }) => {
	
	if (theme) return theme;

	let expensivePromise = new Promise((resolve) => {

		setTimeout(() => {

			let currentTheme = getState().utils.theme;

			let newTheme = '';

			if (theme) {

				if (currentTheme === theme) return;

				newTheme = theme;

			} else {

				if (currentTheme === themes.light) newTheme = themes.dark;

				if (currentTheme === themes.dark) newTheme = themes.light;

			}

			cookie.set('theme', newTheme, {
				expires: 1,
				path: '/',
			});

			resolve(newTheme);

		}, 1000);

	});

	let res = await expensivePromise;

	return res;
	
});

export const utilsSlice = createSlice({
	name,
	initialState,
	reducers: {
		setIsMobile: (state, action: PayloadAction<IsMobile>) => {
			
			let { payload } = action;

			state.isMobile = payload;

		},
		setBrowser: (state, action: PayloadAction<Browser>) => {
			
			let { payload } = action;

			state.browser = {
				name: payload.name,
				version: payload.version,
			};

		},
	},
	extraReducers: builder => {
		builder.addCase(setTheme.pending, (state) => {
			state.isSettingTheme = true;
		})
		builder.addCase(setTheme.fulfilled, (state, { payload }) => {
			state.theme = payload;
			state.isSettingTheme = false;
		})
	}
});

export const {setIsMobile, setBrowser} = utilsSlice.actions;

export const selectUtils = (state: RootState): UtilsState => state[name];

export default utilsSlice.reducer;
