import reducer, {addTimeslot, cancelTimeslot, editTimeslot} from './timeslotSlice';

describe('Redux Timeslot Slice', () => {
	test('Should return the initial state', () => {
		expect(reducer(undefined, {})).toEqual({
			timeslots: [],
		});
	});

	test('Should handle a timeslot being added to empty store', () => {
		const previousState = {
			timeslots: [],
		};

		const newTimeslot = {
			id: 1234,
			activityName: 'River rafting',
			date: '2022-01-18',
			startTime: '13:00',
			endTime: '15:00',
			numMaxGuests: 10,
			isCanceled: false,
		};

		const newState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: false,
				},
			],
		};

		expect(reducer(previousState, addTimeslot(newTimeslot))).toEqual(newState);
	});

	test('Should handle a timeslot being added a store with previous timeslots', () => {
		const previousState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: false,
				},
			],
		};

		const newTimeslot = {
			id: 5678,
			activityName: 'Mountain biking',
			date: '2022-02-19',
			startTime: '16:00',
			endTime: '18:00',
			numMaxGuests: 20,
			isCanceled: false,
		};

		const newState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: false,
				},
				{
					id: 5678,
					activityName: 'Mountain biking',
					date: '2022-02-19',
					startTime: '16:00',
					endTime: '18:00',
					numMaxGuests: 20,
					isCanceled: false,
				},
			],
		};

		expect(reducer(previousState, addTimeslot(newTimeslot))).toEqual(newState);
	});

	test('Should handle a timeslot being canceled', () => {
		const previousState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: false,
				},
				{
					id: 5678,
					activityName: 'Mountain biking',
					date: '2022-02-19',
					startTime: '16:00',
					endTime: '18:00',
					numMaxGuests: 20,
					isCanceled: false,
				},
			],
		};

		const newState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: true,
				},
				{
					id: 5678,
					activityName: 'Mountain biking',
					date: '2022-02-19',
					startTime: '16:00',
					endTime: '18:00',
					numMaxGuests: 20,
					isCanceled: false,
				},
			],
		};

		expect(reducer(previousState, cancelTimeslot(1234))).toEqual(newState);
	});

	test('Should handle a timeslot being edited', () => {
		const previousState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'River rafting',
					date: '2022-01-18',
					startTime: '13:00',
					endTime: '15:00',
					numMaxGuests: 10,
					isCanceled: false,
				},
				{
					id: 5678,
					activityName: 'Mountain biking',
					date: '2022-02-19',
					startTime: '16:00',
					endTime: '18:00',
					numMaxGuests: 20,
					isCanceled: false,
				},
			],
		};

		const editedTimeslot = {
			id: 1234,
			activityName: 'Bungee jumping',
			date: '2022-01-27',
			startTime: '10:00',
			endTime: '13:00',
			numMaxGuests: 6,
			isCanceled: false,
		};

		const newState = {
			timeslots: [
				{
					id: 1234,
					activityName: 'Bungee jumping',
					date: '2022-01-27',
					startTime: '10:00',
					endTime: '13:00',
					numMaxGuests: 6,
					isCanceled: false,
				},
				{
					id: 5678,
					activityName: 'Mountain biking',
					date: '2022-02-19',
					startTime: '16:00',
					endTime: '18:00',
					numMaxGuests: 20,
					isCanceled: false,
				},
			],
		};

		expect(reducer(previousState, editTimeslot(editedTimeslot))).toEqual(newState);
	});
});
