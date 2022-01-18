import React, {useState} from 'react';
import TimeslotModal from './components/TimeslotModal';
import TimeslotView from './components/TimeslotView';

function App() {
	const [isModalOpen, setIsModalOpen] = useState(false);

	return (
		<>
			<h1>Peek Timeslot App:</h1>
			<button
				onClick={() => {
					setIsModalOpen(true);
				}}
			>
				Add a timeslot
			</button>
			<TimeslotModal
				isOpen={isModalOpen}
				onClose={() => {
					setIsModalOpen(false);
				}}
			/>
			<TimeslotView />
		</>
	);
}

export default App;
