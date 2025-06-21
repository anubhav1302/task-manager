import React from 'react';

const MainContent = ({ selected }) => {
  return (
    <div className="p-6 text-lg">
      <h2 className="font-bold text-2xl mb-4">{selected}</h2>
      <p>This is the content area for <strong>{selected}</strong>.</p>
    </div>
  );
};

export default MainContent;
 