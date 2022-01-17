import {createSlice} from '@reduxjs/toolkit';

export const timeslotSlice = createSlice({
	name: 'timeslot',
	initialState: {
		timeslots: [],
	},
	reducers: {
		addTimeslot: (state, action) => {
			state.timeslots.push(action.payload);
		},
	},
});

export const {addTimeslot} = timeslotSlice.actions;

export default timeslotSlice.reducer;
