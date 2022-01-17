import {configureStore} from '@reduxjs/toolkit';
import timeslotReducer from './timeslot/timeslotSlice';

export default configureStore({
	reducer: {
		timeslot: timeslotReducer,
	},
});
