import React, {useState} from 'react';
import styled from 'styled-components';
import moment from 'moment';
import {useSelector, useDispatch} from 'react-redux';
import TimeslotModal from './TimeslotModal';
import {hoursArray} from '../constants/hours';
import {cancelTimeslot} from '../redux/timeslot/timeslotSlice';
import {createIndentsMap, filterAndSortTimeslots} from '../utils/utils';

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

const StyledTimeslotContainer = styled.div`
	position: absolute;
	top: 0;
	bottom: 0;
	left: 120px;
	right: 12px;
`;

const StyledTimeslot = styled.div`
	border: 1px solid white;
	background-color: ${({isCanceled}) => (isCanceled ? 'rgba(237, 122, 77, .9)' : 'rgba(163, 205, 217, 0.9)')};
	position: absolute;
	right: 0;
	left: ${({left}) => `${left}%`};
	top: ${({top}) => `${top}px`};
	height: ${({height}) => `${height}px`};
	padding: 4px;
	box-sizing: border-box;
	border-radius: 8px;
	overflow: hidden;
`;

const StyledTimeslotTitle = styled.p`
	margin: 0;
	margin-bottom: 2px;
	padding: 0;
	font-size: 14px;
`;

const StyledTimeslotDescription = styled.p`
	margin: 0;
	margin-bottom: 2px;
	padding: 0;
	font-size: 12px;
`;

const StyledButton = styled.button`
	margin: 0;
	margin-left: 4px;
	padding: 0;
	background: none;
	border: none;
	cursor: pointer;
	color: #506ad4;
`;

const StyledCanceledText = styled.span`
	margin-left: 4px;
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
	const timeslots = useSelector((state) => state.timeslot.timeslots);
	const [currentDay, setCurrentDay] = useState(moment());

	// filter timeslots based on day
	const formattedCurrentDay = currentDay.format('YYYY-MM-DD');
	const filteredAndSortedTimeslots = filterAndSortTimeslots(timeslots, formattedCurrentDay);

	// create indents for overlapping timeslots
	const indentsMap = createIndentsMap(filteredAndSortedTimeslots);

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
				<StyledTimeslotContainer>
					{filteredAndSortedTimeslots.map((timeslot) => (
						<Timeslot key={timeslot.id} timeslot={timeslot} indent={indentsMap[timeslot.id]} />
					))}
				</StyledTimeslotContainer>
			</StyledContainer>
		</>
	);
}

export default CalendarView;

function Timeslot({timeslot, indent}) {
	const dispatch = useDispatch();
	const [isModalOpen, setIsModalOpen] = useState(false);
	const {id, activityName, startTime, endTime, numMaxGuests, isCanceled} = timeslot;
	const startTimeAsMinutes = moment.duration(startTime).asMinutes();
	const endTimeAsMinutes = moment.duration(endTime).asMinutes();

	return (
		<React.Fragment key={id}>
			<StyledTimeslot
				top={startTimeAsMinutes}
				left={indent * 20}
				height={endTimeAsMinutes - startTimeAsMinutes}
				isCanceled={isCanceled}
			>
				<StyledTimeslotTitle>
					{activityName}{' '}
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
				<StyledTimeslotDescription>
					({startTime} - {endTime})
				</StyledTimeslotDescription>
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
}
