import React, {useState, useEffect} from 'react';
import {useDispatch} from 'react-redux';
import moment from 'moment';
import ReactModal from 'react-modal';
import styled from 'styled-components';
import {addTimeslot, editTimeslot} from '../redux/timeslot/timeslotSlice';

const StyledContainer = styled.div`
	position: relative;
`;

const StyledCloseButton = styled.button`
	position: absolute;
	top: 0;
	right: 0;
	margin: 0;
	padding: 8px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 24px;
`;

const StyledContent = styled.div`
	padding-top: 44px;
`;

const StyledInputRow = styled.div`
	margin-bottom: 12px;
`;

const StyledLabel = styled.label`
	margin-right: 12px;
`;

const StyledErrorMessage = styled.p`
	margin: 0;
	margin-top: 2px;
	padding: 0;
	color: #bb2020;
	font-size: 14px;
`;

const StyledButton = styled.button`
	margin: 0;
	padding: 12px 24px;
	background-color: #3eb595;
	border-radius: 12px;
	border: none;
	cursor: pointer;
`;

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
				isCanceled: false,
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
		<ReactModal isOpen={isOpen} onRequestClose={onClose} contentLabel='Modal'>
			<StyledContainer>
				<StyledCloseButton
					onClick={() => {
						if (!timeslot) {
							// reset form fields
							setActivityName('');
							setDate('');
							setStartTime('');
							setEndTime('');
							setNumMaxGuests(0);
							// reset errors
							setActivityNameError(false);
							setDateError(false);
							setStartTimeError(false);
							setEndTimeError(false);
							setNumMaxGuestsError(false);
						}
						// call onClose
						onClose();
					}}
				>
					✕
				</StyledCloseButton>
				<StyledContent>
					<h2>{timeslot ? 'Edit timeslot' : 'Add timeslot'}</h2>
					<form onSubmit={handleSubmit}>
						<StyledInputRow>
							<StyledLabel htmlFor='activity-name'>Activity Name:</StyledLabel>
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
							{activityNameError ? <StyledErrorMessage>Activity name is a required field</StyledErrorMessage> : null}
						</StyledInputRow>
						<StyledInputRow>
							<StyledLabel htmlFor='date'>Date:</StyledLabel>
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
							{dateError ? <StyledErrorMessage>Date is a required field</StyledErrorMessage> : null}
						</StyledInputRow>
						<StyledInputRow>
							<StyledLabel htmlFor='start-time'>Start Time:</StyledLabel>
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
							{startTimeError ? <StyledErrorMessage>Start time is a required field</StyledErrorMessage> : null}
						</StyledInputRow>
						<StyledInputRow>
							<StyledLabel htmlFor='end-time'>End Time:</StyledLabel>
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
							{endTimeError ? <StyledErrorMessage>End time is a required field</StyledErrorMessage> : null}
						</StyledInputRow>
						<StyledInputRow>
							<StyledLabel htmlFor='num-max-guests'>Maximum number of guests:</StyledLabel>
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
							{numMaxGuestsError ? (
								<StyledErrorMessage>Maximum number of guests must be greater than zero</StyledErrorMessage>
							) : null}
						</StyledInputRow>
						<StyledButton>Submit</StyledButton>
					</form>
				</StyledContent>
			</StyledContainer>
		</ReactModal>
	);
}

export default TimeslotModal;
