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
								isCanceled: true,
						  };
				}),
			};
		},
		editTimeslot: (state, action) => {
			return {
				...state,
				timeslots: state.timeslots.map((timeslot) => {
					return timeslot.id !== action.payload.id
						? timeslot
						: {
								...timeslot,
								activityName: action.payload.activityName,
								date: action.payload.date,
								startTime: action.payload.startTime,
								endTime: action.payload.endTime,
								numMaxGuests: action.payload.numMaxGuests,
						  };
				}),
			};
		},
	},
});

export const {addTimeslot, cancelTimeslot, editTimeslot} = timeslotSlice.actions;

export default timeslotSlice.reducer;
