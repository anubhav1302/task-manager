import React from 'react';

const TaskCard = ({ task, onEdit, onDelete, onStatusChange }) => {
  const statuses = ['To Do', 'In Progress', 'Done'];

  return (
    <div className="border p-3 rounded bg-white shadow">
      <h4 className="font-bold text-md">{task.title}</h4>
      <p className="text-sm text-gray-600">{task.description}</p>
      <div className="text-sm mt-2">
        <p>🎯 Priority: {task.priority}</p>
        <p>👤 Assigned: {task.assignedTo}</p>
        <p>📅 Due: {new Date(task.dueDate).toLocaleDateString()}</p>
      </div>
      <div className="flex justify-between mt-2">
        <select
          value={task.status}
          onChange={(e) => onStatusChange(e.target.value)}
          className="text-sm border rounded px-2"
        >
          {statuses.map((s) => (
            <option key={s} value={s}>{s}</option>
          ))}
        </select>
        <div className="flex gap-2">
          <button onClick={onEdit} className="text-blue-500">Edit</button>
          <button onClick={onDelete} className="text-red-500">Delete</button>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
