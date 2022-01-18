import React, {useState} from 'react';
import styled, {createGlobalStyle} from 'styled-components';
import CalendarView from './components/CalendarView';
import TimeslotModal from './components/TimeslotModal';
import 'normalize.css';

const GlobalStyle = createGlobalStyle`
  body {
    font-family: sans-serif;
  }
`;

const StyledContainer = styled.div`
	padding: 24px;
	padding-top: 0px;
`;

const StyledHeader = styled.h1`
	text-align: center;
`;

const StyledButtonWrapper = styled.div`
	display: flex;
	justify-content: center;
`;

const StyledButton = styled.button`
	margin: 0;
	padding: 12px 24px;
	background-color: #3eb595;
	border-radius: 12px;
	border: none;
	cursor: pointer;
`;

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<GlobalStyle />
			<StyledContainer>
				<StyledHeader>Peek Timeslot App</StyledHeader>
				<StyledButtonWrapper>
					<StyledButton
						onClick={() => {
							setIsModalOpen(true);
						}}
					>
						+ Add a timeslot
					</StyledButton>
				</StyledButtonWrapper>
				<TimeslotModal
					isOpen={isModalOpen}
					onClose={() => {
						setIsModalOpen(false);
					}}
				/>
				<CalendarView />
			</StyledContainer>
		</>
	);
}

export default App;
