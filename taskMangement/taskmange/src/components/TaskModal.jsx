import React, { useState, useEffect } from 'react';

const TaskModal = ({ onClose, onSave, existingTask, currentBoard }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [assignedTo, setAssignedTo] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [status, setStatus] = useState('To Do');

  useEffect(() => {
    if (existingTask) {
      setTitle(existingTask.title || '');
      setDescription(existingTask.description || '');
      setPriority(existingTask.priority || 'Low');
      setAssignedTo(existingTask.assignedTo || '');
      setDueDate(existingTask.dueDate ? existingTask.dueDate.slice(0, 10) : '');
      setStatus(existingTask.status || 'To Do');
    }
  }, [existingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const task = {
      id: existingTask?.id,
      title,
      description,
      priority,
      assignedTo,
      dueDate,
      status,
      board: currentBoard,
    };

    onSave(task); // ✅ send to Board
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-lg space-y-4"
      >
        <h2 className="text-xl font-semibold">{existingTask ? 'Edit Task' : 'Add Task'}</h2>

        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full border px-3 py-2 rounded"
        />

        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option>Low</option>
          <option>Medium</option>
          <option>High</option>
        </select>

        <input
          type="text"
          placeholder="Assigned To"
          value={assignedTo}
          onChange={(e) => setAssignedTo(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        />

        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="w-full border px-3 py-2 rounded"
        >
          <option>To Do</option>
          <option>In Progress</option>
          <option>Done</option>
        </select>

        <div className="flex justify-end gap-2">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded"
          >
            Cancel
          </button>
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default TaskModal;
