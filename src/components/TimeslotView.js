import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {cancelTimeslot} from '../redux/timeslot/timeslotSlice';

function TimeslotView() {
	const dispatch = useDispatch();
	const timeslots = useSelector((state) => state.timeslot.timeslots);

	return (
		<>
			<h2>Current timeslots:</h2>
			{timeslots && timeslots.length > 0 ? (
				<ul>
					{timeslots.map((timeslot) => {
						const {id, activityName, date, startTime, endTime, numMaxGuests, isCancelled} = timeslot;
						return (
							<li key={id}>
								<p>
									<span>Activity name: {activityName} </span>
									{!isCancelled ? (
										<button
											onClick={() => {
												dispatch(cancelTimeslot(id));
											}}
										>
											Cancel
										</button>
									) : (
										<span>(CANCELED)</span>
									)}
								</p>
								<ul>
									<li>Date: {date}</li>
									<li>Start time: {startTime}</li>
									<li>End time: {endTime}</li>
									<li>Number of maximum guests: {numMaxGuests}</li>
								</ul>
							</li>
						);
					})}
				</ul>
			) : null}
		</>
	);
}

export default TimeslotView;
