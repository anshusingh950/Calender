import React from 'react';
import Routes1 from './routes';
import { BrowserRouter as Router } from 'react-router-dom';

const App = () => {
  return (
    <Router>
      <div>  
        <Routes1 /> 
      </div>
    </Router>
  );
};

export default App;
