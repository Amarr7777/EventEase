import React, { useEffect, useState } from 'react';
import axios from 'axios';

function EventCard({ event, onDelete, onEdit }) {
  const [user, setUser] = useState(null);
  const date = new Date(event.date);

  async function fetchUser() {
    console.log(event._id)
    try {
      const response = await axios.get(`http://localhost:8000/events/event/events/${event._id}`);
      console.log("Event",response.data.user.name)
      setUser(response.data.user);
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  }

  useEffect(() => {
    fetchUser();
  }, [event._id]);

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`http://localhost:8000/events/event/events/${event._id}`);

        if (response.status >= 200 && response.status < 300) {
          if (onDelete) onDelete(event._id);
        } else {
          alert('Failed to delete event');
        }
      } catch (error) {
        console.error('Error deleting event:', error);
        alert('An error occurred while deleting the event');
      }
    }
  };

  return (
    <article className="flex bg-white transition shadow-xl rounded-lg hover:shadow-2xl">
      <div className="rotate-180 p-2 [writing-mode:_vertical-lr]">
        <time
          datetime={`${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`}
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{date.getFullYear()}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{`${date.toLocaleString("default", { month: "short" })} ${date.getDate()}`}</span>
        </time>
      </div>

      <div className="hidden sm:block sm:basis-56">
        <img
          alt=""
          src="https://images.unsplash.com/photo-1609557927087-f9cf8e88de18?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80"
          className="aspect-square h-full w-full object-cover"
        />
      </div>

      <div className="flex flex-1 flex-col justify-between">
        <div className="border-s border-gray-900/10 p-4 sm:border-l-transparent sm:p-6">
          <a >
            <h3 className="font-bold uppercase text-gray-900">{event.name}</h3>
          </a>

          <p className="mt-2 line-clamp-3 text-sm/relaxed text-gray-700">
            {event.description}
          </p>
        </div>

        <div className="sm:flex sm:items-end sm:justify-end">
          <div className="flex justify-center items-center gap-2">
            <button 
              onClick={handleDelete}
              className="py-2 px-5 hover:text-blue-950 hover:scale-105 bg-transparent rounded-md text-blue-700">
              Delete
            </button>
            <button 
              onClick={() => onEdit(event)}
              className="py-2 px-5 hover:text-blue-950 hover:scale-105 bg-transparent rounded-md text-blue-700">
              Edit
            </button>
          </div>
          <a
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400 rounded-br-lg"
          >
            {user ? user.name : 'Loading...'}
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
