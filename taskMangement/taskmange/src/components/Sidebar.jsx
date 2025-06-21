import React from 'react';

const Sidebar = ({ selected, onSelect }) => {
  const boards = ['Boards', 'Frontend', 'Marketing Plan'];

  return (
    <aside className="w-60 bg-gray-100 p-4 border-r">
      <ul className="space-y-3">
        {boards.map((item) => (
          <li
            key={item}
            className={`cursor-pointer p-2 rounded hover:bg-blue-100 ${selected === item ? 'bg-blue-200 font-bold' : ''}`}
            onClick={() => onSelect(item)}
          >
            {item}
          </li>
        ))}
      </ul>
    </aside>
  );
};

export default Sidebar;
