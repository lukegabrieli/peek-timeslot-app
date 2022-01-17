import React from 'react';
import {useSelector} from 'react-redux';

function TimeslotView() {
	const timeslots = useSelector((state) => state.timeslot.timeslots);

	return (
		<>
			<h2>View timeslots:</h2>
			{timeslots && timeslots.length > 0 ? (
				<ul>
					{timeslots.map((timeslot, index) => {
						const {activityName, date, startTime, endTime, numMaxGuests} = timeslot;
						return (
							<li key={index}>
								<p>Activity name: {activityName}</p>
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
