// src/pages/Habits.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import HabitItem from '../components/HabitItem';

const Habits = () => {
  const [habits, setHabits] = useState([]);
  const [showAddModal, setShowAddModal] = useState(false);

  useEffect(() => {
    fetchHabits();
  }, []);

  const fetchHabits = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/habits`);
      setHabits(response.data);
    } catch (error) {
      console.error('Error fetching habits:', error);
    }
  };

  const handleAddHabit = async (habitData) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/habits`, habitData);
      fetchHabits();
      setShowAddModal(false);
    } catch (error) {
      console.error('Error adding habit:', error);
    }
  };

  const handleCompleteHabit = async (habitId) => {
    try {
      await axios.post(`${process.env.REACT_APP_API_URL}/api/habits/${habitId}/complete`);
      fetchHabits();
    } catch (error) {
      console.error('Error completing habit:', error);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">My Habits</h1>
        <button
          onClick={() => setShowAddModal(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
        >
          Add New Habit
        </button>
      </div>

      <div className="space-y-4">
        {habits.map(habit => (
          <HabitItem
            key={habit._id}
            habit={habit}
            onComplete={handleCompleteHabit}
          />
        ))}
      </div>
    </div>
  );
};

// src/pages/Calendar.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { format, startOfMonth, endOfMonth, eachDayOfInterval } from 'date-fns';

const Calendar = () => {
  const [events, setEvents] = useState([]);
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    fetchEvents();
  }, [currentDate]);

  const fetchEvents = async () => {
    try {
      const start = startOfMonth(currentDate);
      const end = endOfMonth(currentDate);
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}/api/events?start=${start.toISOString()}&end=${end.toISOString()}`
      );
      setEvents(response.data);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const days = eachDayOfInterval({
    start: startOfMonth(currentDate),
    end: endOfMonth(currentDate)
  });

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">{format(currentDate, 'MMMM yyyy')}</h1>
        <div className="space-x-2">
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Previous
          </button>
          <button
            onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}
            className="px-4 py-2 border rounded hover:bg-gray-100"
          >
            Next
          </button>
        </div>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
          <div key={day} className="text-center font-bold py-2">
            {day}
          </div>
        ))}
        {days.map(day => (
          <div
            key={day.toISOString()}
            className="border p-2 min-h-[100px] relative"
          >
            <span className="absolute top-1 right-1 text-sm">
              {format(day, 'd')}
            </span>
            {events
              .filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
              .map(event => (
                <div
                  key={event._id}
                  className="text-sm mt-4 p-1 rounded bg-blue-100"
                >
                  {event.title}
                </div>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
};
