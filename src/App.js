import React from 'react';
import Modal from './components/Modal';
import AddTimeslotForm from './components/AddTimeslotForm';
import TimeslotView from './components/TimeslotView';

function App() {
	return (
		<>
			<h1>Peek Timeslot App:</h1>
			<AddTimeslotForm />
			<TimeslotView />
		</>
	);
}

export default App;