import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import {addTimeslot} from '../redux/timeslot/timeslotSlice';

function AddTimeslotForm() {
	const dispatch = useDispatch();

	// form values
	const [activityName, setActivityName] = useState('');
	const [date, setDate] = useState('');
	const [startTime, setStartTime] = useState('');
	const [endTime, setEndTime] = useState('');
	const [numMaxGuests, setNumMaxGuests] = useState(0);

	// form errors
	const [activityNameError, setActivityNameError] = useState(false);
	const [dateError, setDateError] = useState(false);
	const [startTimeError, setStartTimeError] = useState(false);
	const [endTimeError, setEndTimeError] = useState(false);
	const [numMaxGuestsError, setNumMaxGuestsError] = useState(false);

	const handleSubmit = (e) => {
		e.preventDefault();

		// trim form field values
		const trimmedActivityName = activityName.trim();
		const trimmedDate = date.trim();
		const trimmedStartTime = startTime.trim();
		const trimmedEndTime = endTime.trim();
		const numMaxGuestsIsValid = numMaxGuests > 0;

		// check to make sure all fields have value
		if (!trimmedActivityName || !trimmedDate || !trimmedStartTime || !trimmedEndTime || !numMaxGuestsIsValid) {
			if (!trimmedActivityName) {
				setActivityNameError(true);
			}
			if (!trimmedDate) {
				setDateError(true);
			}
			if (!trimmedStartTime) {
				setStartTimeError(true);
			}
			if (!trimmedEndTime) {
				setEndTimeError(true);
			}
			if (!numMaxGuestsIsValid) {
				setNumMaxGuestsError(true);
			}

			return;
		}

		// construct timeslot object to dispatch to redux store
		const timeslot = {
			activityName: activityName,
			date: date,
			startTime: startTime,
			endTime: endTime,
			numMaxGuests: numMaxGuests,
		};

		// dispatch
		dispatch(addTimeslot(timeslot));

		// reset form fields
		setActivityName('');
		setDate('');
		setStartTime('');
		setEndTime('');
		setNumMaxGuests('');
	};

	return (
		<>
			<h2>Add a timeslot:</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<label htmlFor='activity-name'>Activity Name:</label>
					<input
						id='activity-name'
						name='activity-name'
						type='text'
						value={activityName}
						onChange={(e) => {
							if (activityNameError) {
								setActivityNameError(false);
							}
							setActivityName(e.target.value);
						}}
					/>
					{activityNameError ? <p>Activity name is a required field</p> : null}
				</div>
				<div>
					<label htmlFor='date'>Date:</label>
					<input
						id='date'
						name='date'
						type='date'
						min={moment().format('YYYY-MM-DD')}
						value={date}
						onChange={(e) => {
							if (dateError) {
								setDateError(false);
							}
							setDate(e.target.value);
						}}
					/>
					{dateError ? <p>Date is a required field</p> : null}
				</div>
				<div>
					<label htmlFor='start-time'>Start Time:</label>
					<input
						id='start-time'
						name='start-time'
						type='time'
						value={startTime}
						onChange={(e) => {
							if (startTimeError) {
								setStartTimeError(false);
							}
							setStartTime(e.target.value);
						}}
					/>
					{startTimeError ? <p>Start time is a required field</p> : null}
				</div>
				<div>
					<label htmlFor='end-time'>End Time:</label>
					<input
						id='end-time'
						name='end-time'
						type='time'
						value={endTime}
						onChange={(e) => {
							if (endTimeError) {
								setEndTimeError(false);
							}
							setEndTime(e.target.value);
						}}
					/>
					{endTimeError ? <p>End time is a required field</p> : null}
				</div>
				<div>
					<label htmlFor='num-max-guests'>Maximum number of guests:</label>
					<input
						id='num-max-guests'
						name='num-max-guests'
						type='number'
						value={numMaxGuests}
						onChange={(e) => {
							if (numMaxGuestsError) {
								setNumMaxGuestsError(false);
							}
							setNumMaxGuests(e.target.value);
						}}
					/>
					{numMaxGuestsError ? <p>Maximum number of guests must be greater than zero</p> : null}
				</div>
				<button>add timeslot</button>
			</form>
		</>
	);
}

export default AddTimeslotForm;
