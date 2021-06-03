import React from 'react';
import Portfolio from './containers/portfolio/Portfolio';

import './App.css';

const App: React.FC = () => {
  return (
    <div className='flex flex-col items-center justify-center h-full'>
      <Portfolio />
    </div>
  );
};

export default App;
