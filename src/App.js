import React, { useState } from 'react';
import './App.css';
import GenderDropdown from './GenderDropdown';

import ChartWrapper from './newChartWrapper';
// import ChartWrapper from './ChartWrapper';


const App = () => {

  const [gender, setGender] = useState('men');

  const genderSelected = (event) => {
    setGender(event.target.value);
  }

  return (
    <div className="App" >
      <div className='container'>
        <h3>Bar chart</h3>
        <GenderDropdown genderSelected={event => genderSelected(event)} />
        <ChartWrapper gender={gender} />

      </div>
    </div>
  );
}


export default App;
