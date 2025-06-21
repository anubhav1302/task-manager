import React, { useState, useEffect } from 'react';
import TaskColumn from './TaskColumn';
import TaskModal from './TaskModal';
import axios from '../api/axios';

const Board = ({ board }) => {
  const [tasks, setTasks] = useState([]);
  const [boardId, setBoardId] = useState(null);
  const [isModalOpen, setModalOpen] = useState(false);
  const [editTask, setEditTask] = useState(null);

  useEffect(() => {
    const fetchBoardAndTasks = async () => {
      try {
        const boardsRes = await axios.get('/boards');
        const selectedBoard = boardsRes.data.find((b) => b.name === board);

        if (selectedBoard) {
          setBoardId(selectedBoard._id);
          const tasksRes = await axios.get(`/boards/${selectedBoard._id}/tasks`);
          setTasks(tasksRes.data);
        } else {
          const newBoard = await axios.post('/boards', { name: board });
          setBoardId(newBoard.data._id);
          setTasks([]);
        }
      } catch (error) {
        console.error('Failed to fetch board or tasks:', error);
      }
    };

    fetchBoardAndTasks();
  }, [board]);

  const handleAddOrEdit = async (task) => {
    try {
      const formattedTask = {
        title: task.title,
        description: task.description,
        priority: task.priority,
        assignedTo: task.assignedTo,
        dueDate: task.dueDate,
        status: task.status
      };

      if (task.id) {
        const res = await axios.put(`/tasks/${task.id}`, formattedTask);
        setTasks(tasks.map((t) => (t._id === task.id ? res.data : t)));
      } else {
        const res = await axios.post(`/boards/${boardId}/tasks`, formattedTask);
        setTasks([...tasks, res.data]);
      }
      setModalOpen(false);
      setEditTask(null);
    } catch (error) {
      console.error('Failed to save task:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`/tasks/${id}`);
      setTasks(tasks.filter((t) => t._id !== id));
    } catch (error) {
      console.error('Failed to delete task:', error);
    }
  };

  const handleStatusUpdate = async (id, newStatus) => {
    try {
      const updated = await axios.put(`/tasks/${id}`, { status: newStatus });
      setTasks(tasks.map((t) => (t._id === id ? updated.data : t)));
    } catch (error) {
      console.error('Failed to update status:', error);
    }
  };

  return (
    <div className="flex-1 p-4 overflow-auto">
      <div className="flex justify-between mb-4">
        <h2 className="text-2xl font-semibold">{board} Board</h2>
        <button
          onClick={() => {
            setEditTask(null);
            setModalOpen(true);
          }}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          + Add Task
        </button>
      </div>
      <div className="grid grid-cols-3 gap-4">
        {['To Do', 'In Progress', 'Done'].map((status) => (
          <TaskColumn
            key={status}
            status={status}
            tasks={tasks.filter((t) => t.status === status)}
            onEdit={(task) => {
              setEditTask({ ...task, id: task._id });
              setModalOpen(true);
            }}
            onDelete={(id) => handleDelete(id)}
            onStatusUpdate={(id, newStatus) => handleStatusUpdate(id, newStatus)}
          />
        ))}
      </div>
      {isModalOpen && (
        <TaskModal
          onClose={() => setModalOpen(false)}
          onSave={handleAddOrEdit}
          existingTask={editTask}
          currentBoard={board}
        />
      )}
    </div>
  );
};

export default Board;
