import React, { useState } from 'react';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Board from './components/Board';

const App = () => {
  const [selectedBoard, setSelectedBoard] = useState('Frontend');

  return (
    <div className="h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        <Sidebar selected={selectedBoard} onSelect={setSelectedBoard} />
        <Board board={selectedBoard} />
      </div>
    </div>
  );
};

export default App;
