import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cancelTimeslot} from '../redux/timeslot/timeslotSlice';
import TimeslotModal from './TimeslotModal';

function TimeslotView() {
	const timeslots = useSelector((state) => state.timeslot.timeslots);

	return (
		<>
			<h2>Current timeslots:</h2>
			{timeslots && timeslots.length > 0 ? (
				<ul>
					{timeslots.map((timeslot) => (
						<Timeslot key={timeslot.id} timeslot={timeslot} />
					))}
				</ul>
			) : null}
		</>
	);
}

export default TimeslotView;

function Timeslot({timeslot}) {
	const dispatch = useDispatch();
	const {id, activityName, date, startTime, endTime, numMaxGuests, isCancelled} = timeslot;
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<li>
				<p>
					<span>Activity name: {activityName} </span>
					{!isCancelled ? (
						<>
							<button
								onClick={() => {
									dispatch(cancelTimeslot(id));
								}}
							>
								Cancel
							</button>
							<button
								onClick={() => {
									setIsModalOpen(true);
								}}
							>
								Edit
							</button>
						</>
					) : (
						<span>(CANCELED)</span>
					)}
				</p>
				<ul>
					<li key='date'>Date: {date}</li>
					<li key='startTime'>Start time: {startTime}</li>
					<li key='endTime'>End time: {endTime}</li>
					<li key='numMaxGuests'>Number of maximum guests: {numMaxGuests}</li>
				</ul>
			</li>
			<TimeslotModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
				timeslot={timeslot}
			/>
		</>
	);
}
