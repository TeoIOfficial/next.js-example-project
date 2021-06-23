import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import {HYDRATE} from 'next-redux-wrapper';
import axios from 'axios';

const name = 'user';

const initialState = {
	id: null,
	name: '',
	isLoggedIn: false,
	isFetching: false,
};

export const getUserById = createAsyncThunk(`${name}/getUserById`, async (userId = null) => {
	const response = await axios.get(`https://reqres.in/api/users/${userId}`);

	let data = response?.data?.data;

	return {
		id: data?.id ?? initialState.id,
		name: data?.first_name ?? initialState.name,
	};
});

export const userSlice = createSlice({
	name,
	initialState,
	reducers: {},
	extraReducers: {
		[HYDRATE]: (state, action) => {
			return {
				...state,
				...action.payload[name],
			};
		},
		[getUserById.pending]: state => {
			state.isFetching = true;
		},
		[getUserById.fulfilled]: (state, {payload}) => {
			state.id = payload.id;
			state.name = payload.name;
			state.isLoggedIn = Boolean(payload.id);
			state.isFetching = false;
		},
		[getUserById.rejected]: () => {
			return {...initialState};
		},
	},
});

export const selectUser = state => state[name];

export default userSlice.reducer;