import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {addTimeslot} from './redux/timeslot/timeslotSlice';

function App() {
	const [name, setName] = useState('');
	const timeslots = useSelector((state) => state.timeslot.timeslots);
	const dispatch = useDispatch();

	return (
		<div>
			<p>timeslots:</p>
			<div>
				{timeslots.map((timeslot) => {
					return <p key={timeslot}>{timeslot}</p>;
				})}
			</div>
			<label htmlFor='name'>Name:</label>
			<input type='text' id='name' name='name' onChange={(event) => setName(event.target.value)} />
			<button onClick={() => dispatch(addTimeslot(name))}>add timeslot</button>
		</div>
	);
}

export default App;
