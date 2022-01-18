const initialHoursArray = Array.from(Array(24).keys());

export const hoursArray = initialHoursArray.map((hour) => {
	return {
		startMinutes: hour * 60,
		endMinutes: (hour + 1) * 60,
	};
});
