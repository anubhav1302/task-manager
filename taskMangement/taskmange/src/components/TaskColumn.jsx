import React from 'react';
import TaskCard from './TaskCard';

const TaskColumn = ({ status, tasks, onEdit, onDelete, onStatusUpdate }) => {
  return (
    <div>
      <h3 className="text-lg font-bold mb-2">{status}</h3>
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => onEdit(task)}
            onDelete={() => onDelete(task._id)}
            onStatusChange={(newStatus) => onStatusUpdate(task._id, newStatus)}
          />
        ))}
      </div>
    </div>
  );
};

export default TaskColumn;
