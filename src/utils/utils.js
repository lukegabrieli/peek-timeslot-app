import moment from 'moment';

export const filterAndSortTimeslots = (timeslots, currentDay) => {
	const newTimeslots = [...timeslots];

	return newTimeslots
		.filter(({date}) => {
			return date === currentDay;
		})
		.sort((timeslot1, timeslot2) => timeslot1.startTime.localeCompare(timeslot2.startTime));
};

// create indents for overlapping timeslots
export const createIndentsMap = (timeslots) => {
	const indentsMap = {};
	let currentIndent = 0;

	for (let x = 0; x < timeslots.length; x++) {
		const currentTimeslot = timeslots[x];
		const previousTimeslot = timeslots[x - 1];

		if (previousTimeslot) {
			const currentTimeslotStartTimeMoment = moment(`${currentTimeslot.date} ${currentTimeslot.startTime}`);
			const previousTimeslotEndTimeMoment = moment(`${previousTimeslot.date} ${previousTimeslot.endTime}`);

			if (currentTimeslotStartTimeMoment.isBefore(previousTimeslotEndTimeMoment)) {
				currentIndent = currentIndent + 1;
			} else {
				currentIndent = 0;
			}

			indentsMap[currentTimeslot.id] = currentIndent;
		} else {
			indentsMap[currentTimeslot.id] = 0;
		}
	}

	return indentsMap;
};
