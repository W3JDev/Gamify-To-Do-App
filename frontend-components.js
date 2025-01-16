// src/components/TaskItem.js
import React from 'react';
import { format } from 'date-fns';

const TaskItem = ({ task, onComplete, onDelete }) => {
  return (
    <div className="flex items-center justify-between p-4 bg-white rounded-lg shadow mb-2">
      <div className="flex items-center">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onComplete(task._id)}
          className="mr-4"
        />
        <div>
          <h3 className={`text-lg ${task.completed ? 'line-through text-gray-500' : ''}`}>
            {task.title}
          </h3>
          {task.dueDate && (
            <p className="text-sm text-gray-600">
              Due: {format(new Date(task.dueDate), 'MMM d, yyyy')}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(task._id)}
        className="text-red-500 hover:text-red-700"
      >
        Delete
      </button>
    </div>
  );
};

// src/components/HabitItem.js
import React from 'react';

const HabitItem = ({ habit, onComplete }) => {
  return (
    <div className="p-4 bg-white rounded-lg shadow mb-2">
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-lg font-medium">{habit.title}</h3>
          <p className="text-sm text-gray-600">Streak: {habit.streak} days</p>
        </div>
        <button
          onClick={() => onComplete(habit._id)}
          className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
        >
          Complete Today
        </button>
      </div>
    </div>
  );
};

// src/components/AddTaskModal.js
import React, { useState } from 'react';

const AddTaskModal = ({ onAdd, onClose }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd({ title, description, dueDate });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg w-96">
        <h2 className="text-xl font-bold mb-4">Add New Task</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border rounded"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2">Due Date</label>
            <input
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              className="w-full p-2 border rounded"
            />
          </div>
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
            >
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
