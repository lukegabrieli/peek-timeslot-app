import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import {hoursArray} from '../constants/hours';
import {cancelTimeslot} from '../redux/timeslot/timeslotSlice';
import TimeslotModal from './TimeslotModal';

const StyledContainer = styled.div`
	position: relative;
	margin-top: 8px;
`;

const StyledCalendarHour = styled.div`
	width: 100%;
	border: 1px solid black;
	border-bottom: none;
	&:last-child {
		border-bottom: 1px solid black;
	}
	min-height: 60px;
	box-sizing: border-box;
	padding: 4px;
`;

const StyledTimeslot = styled.div`
	background-color: ${({isCanceled}) => (isCanceled ? 'rgba(237, 122, 77, .9)' : 'rgba(163, 205, 217, 0.9)')};
	position: absolute;
	left: 120px;
	right: 12px;
	top: ${({top}) => `${top}px`};
	height: ${({height}) => `${height}px`};
	padding: 4px;
	box-sizing: border-box;
	border-radius: 8px;
`;

const StyledTimeslotTitle = styled.p`
	margin: 0;
	padding: 0;
`;

const StyledTimeslotDescription = styled.p`
	margin: 0;
	padding: 0;
	font-size: 14px;
`;

const StyledButton = styled.button`
	margin: 0;
	margin-left: 8px;
	padding: 0;
	background: none;
	border: none;
	cursor: pointer;
	color: #506ad4;
`;

const StyledCanceledText = styled.span`
	margin-left: 8px;
`;

const StyledHeaderContainer = styled.div`
	display: flex;
	justify-content: center;
	margin-top: 24px;
`;

const StyledChevronButtons = styled.button`
	margin: 0;
	padding: 30px 16px 34px 16px;
	background-color: transparent;
	border: none;
	cursor: pointer;
	font-size: 56px;
	line-height: 0;
	align-self: flex-start;
`;

function CalendarView() {
	const dispatch = useDispatch();
	const timeslots = useSelector((state) => state.timeslot.timeslots);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentDay, setCurrentDay] = useState(moment());

	// filter timeslots based on day
	const formattedCurrentDay = currentDay.format('YYYY-MM-DD');
	const filteredTimeslots = timeslots.filter(({date}) => {
		return date === formattedCurrentDay;
	});

	return (
		<>
			<StyledHeaderContainer>
				<StyledChevronButtons
					onClick={() => {
						const prevDay = moment(currentDay).subtract(1, 'days');
						setCurrentDay(prevDay);
					}}
				>
					‹
				</StyledChevronButtons>
				<h2>{currentDay.format('MMMM DD, YYYY')}</h2>
				<StyledChevronButtons
					onClick={() => {
						const nextDay = moment(currentDay).add(1, 'days');
						setCurrentDay(nextDay);
					}}
				>
					›
				</StyledChevronButtons>
			</StyledHeaderContainer>
			<StyledContainer>
				<div>
					{hoursArray.map((hour) => {
						const formattedStartTime = moment.utc().startOf('day').add(hour.startMinutes, 'minutes').format('HH:mm');
						const formattedEndTime = moment.utc().startOf('day').add(hour.endMinutes, 'minutes').format('HH:mm');

						return (
							<StyledCalendarHour key={hour.startMinutes}>
								{formattedStartTime} - {formattedEndTime}
							</StyledCalendarHour>
						);
					})}
				</div>
				{filteredTimeslots.map((timeslot) => {
					const {id, activityName, startTime, endTime, numMaxGuests, isCanceled} = timeslot;
					const startTimeAsMinutes = moment.duration(startTime).asMinutes();
					const endTimeAsMinutes = moment.duration(endTime).asMinutes();
					return (
						<React.Fragment key={id}>
							<StyledTimeslot
								top={startTimeAsMinutes}
								height={endTimeAsMinutes - startTimeAsMinutes}
								isCanceled={isCanceled}
							>
								<StyledTimeslotTitle>
									{activityName} ({startTime} - {endTime})
									{!isCanceled ? (
										<>
											<StyledButton
												onClick={() => {
													dispatch(cancelTimeslot(id));
												}}
											>
												Cancel
											</StyledButton>
											<StyledButton
												onClick={() => {
													setIsModalOpen(true);
												}}
											>
												Edit
											</StyledButton>
										</>
									) : (
										<StyledCanceledText>(Canceled)</StyledCanceledText>
									)}
								</StyledTimeslotTitle>
								<StyledTimeslotDescription>Maximum guests: {numMaxGuests}</StyledTimeslotDescription>
							</StyledTimeslot>
							<TimeslotModal
								isOpen={isModalOpen}
								onClose={() => {
									setIsModalOpen(false);
								}}
								timeslot={timeslot}
							/>
						</React.Fragment>
					);
				})}
			</StyledContainer>
		</>
	);
}

export default CalendarView;
