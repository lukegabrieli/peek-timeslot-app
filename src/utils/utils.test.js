import {createIndentsMap, filterAndSortTimeslots} from './utils';

describe('Utilities', () => {
	test('createIndentsMap should create the indents map', () => {
		const timeslots = [
			{
				id: 1234,
				activityName: 'River rafting',
				date: '2022-01-19',
				startTime: '07:00',
				endTime: '09:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 2345,
				activityName: 'Kayaking',
				date: '2022-01-19',
				startTime: '10:00',
				endTime: '11:30',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 3456,
				activityName: 'Mountain biking',
				date: '2022-01-19',
				startTime: '11:00',
				endTime: '13:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 4567,
				activityName: 'Cave diving',
				date: '2022-01-19',
				startTime: '12:00',
				endTime: '14:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 5678,
				activityName: 'Sky diving',
				date: '2022-01-19',
				startTime: '17:00',
				endTime: '18:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
		];

		const indentsMap = {
			1234: 0,
			2345: 0,
			3456: 1,
			4567: 2,
			5678: 0,
		};

		expect(createIndentsMap(timeslots)).toEqual(indentsMap);
	});

	test('filterAndSortTimeslots should filter and sort the timeslots', () => {
		const timeslots = [
			{
				id: 4567,
				activityName: 'Cave diving',
				date: '2022-01-19',
				startTime: '12:00',
				endTime: '14:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 2345,
				activityName: 'Kayaking',
				date: '2022-01-20',
				startTime: '10:00',
				endTime: '11:30',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 3456,
				activityName: 'Mountain biking',
				date: '2022-01-19',
				startTime: '11:00',
				endTime: '13:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 1234,
				activityName: 'River rafting',
				date: '2022-01-19',
				startTime: '07:00',
				endTime: '09:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 5678,
				activityName: 'Sky diving',
				date: '2022-01-20',
				startTime: '17:00',
				endTime: '18:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
		];

		const filteredAndSortedTimeslots = [
			{
				id: 1234,
				activityName: 'River rafting',
				date: '2022-01-19',
				startTime: '07:00',
				endTime: '09:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 3456,
				activityName: 'Mountain biking',
				date: '2022-01-19',
				startTime: '11:00',
				endTime: '13:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
			{
				id: 4567,
				activityName: 'Cave diving',
				date: '2022-01-19',
				startTime: '12:00',
				endTime: '14:00',
				numMaxGuests: 1,
				isCanceled: false,
			},
		];

		expect(filterAndSortTimeslots(timeslots, '2022-01-19')).toEqual(filteredAndSortedTimeslots);
	});
});
