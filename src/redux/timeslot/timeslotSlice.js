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
		cancelTimeslot: (state, action) => {
			return {
				...state,
				timeslots: state.timeslots.map((timeslot) => {
					return timeslot.id !== action.payload
						? timeslot
						: {
								...timeslot,
								isCancelled: true,
						  };
				}),
			};
		},
	},
});

export const {addTimeslot, cancelTimeslot} = timeslotSlice.actions;

export default timeslotSlice.reducer;
