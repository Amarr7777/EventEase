import React from "react";
import axios from "axios"

function EventCard({ event,onDelete, setShowEditModal, onEdit }) {
  const date = new Date(event.date);

  // Extract year, month, and day
  const year = date.getFullYear();
  const month = date.toLocaleString("default", { month: "short" }); // "Sep" for September
  const day = date.getDate();

  const handleDelete = async () => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      try {
        const response = await axios.delete(`http://localhost:3001/event/events/${event._id}`);

        if (response.status >= 200 && response.status < 300) {
          if (onDelete) onDelete(event._id); // Notify parent to remove event from state
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
          datetime={`${year}-${date.getMonth() + 1}-${day}`}
          className="flex items-center justify-between gap-4 text-xs font-bold uppercase text-gray-900"
        >
          <span>{year}</span>
          <span className="w-px flex-1 bg-gray-900/10"></span>
          <span>{`${month} ${day}`}</span>
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
          <a href="#">
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
            className="py-2 px-5  hover:text-blue-950 hover:scale-105 bg-transparent rounded-md text-blue-700 ">
              Delete
            </button>
            <button 
            onClick={()=>{onEdit()}}
            className="py-2 px-5  hover:text-blue-950 hover:scale-105 bg-transparent rounded-md text-blue-700 ">
              Edit
            </button>
          </div>
          <a
            href="#"
            className="block bg-yellow-300 px-5 py-3 text-center text-xs font-bold uppercase text-gray-900 transition hover:bg-yellow-400 rounded-br-lg"
          >
            Amar G Nath
          </a>
        </div>
      </div>
    </article>
  );
}

export default EventCard;
