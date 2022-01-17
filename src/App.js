import React, {useState} from 'react';

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Peek Timeslot App</h1>
      <p>You have clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

export default App;
