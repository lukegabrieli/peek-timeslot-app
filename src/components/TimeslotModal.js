import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import ReactModal from 'react-modal';
import {addTimeslot, editTimeslot} from '../redux/timeslot/timeslotSlice';

ReactModal.setAppElement('#root');

function TimeslotModal({isOpen = false, onClose, timeslot}) {
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

	useEffect(() => {
		if (timeslot) {
			setActivityName(timeslot.activityName);
			setDate(timeslot.date);
			setStartTime(timeslot.startTime);
			setEndTime(timeslot.endTime);
			setNumMaxGuests(timeslot.numMaxGuests);
		}
	}, [timeslot]);

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

		// if a timeslot already exists, we're just editing
		if (timeslot) {
			const editedTimeslot = {
				id: timeslot.id,
				activityName: activityName,
				date: date,
				startTime: startTime,
				endTime: endTime,
				numMaxGuests: numMaxGuests,
			};

			// dispatch
			dispatch(editTimeslot(editedTimeslot));
		} else {
			// or else we're adding a new one!
			// construct new timeslot object to dispatch to redux store
			const newTimeslot = {
				id: Math.floor(Math.random() * 100000), // randomize an id
				activityName: activityName,
				date: date,
				startTime: startTime,
				endTime: endTime,
				numMaxGuests: numMaxGuests,
				isCancelled: false,
			};

			// dispatch
			dispatch(addTimeslot(newTimeslot));

			// reset form fields
			setActivityName('');
			setDate('');
			setStartTime('');
			setEndTime('');
			setNumMaxGuests(0);
		}

		// close the modal
		onClose();
	};

	return (
		<>
			<ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel='Modal'>
				<button
					onClick={() => {
						// call onClose
						onClose();
					}}
				>
					Close modal
				</button>
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
					<button>{timeslot ? 'Edit timeslot' : 'Add timeslot'}</button>
				</form>
			</ReactModal>
		</>
	);
}

export default TimeslotModal;
