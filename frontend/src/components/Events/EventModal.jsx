import React, { useEffect, useState } from "react";
import axios from "axios";

function EventModal({ setShowModal, onAdd, user }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");


  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // Basic validation
    if (!eventName || !eventDescription || !eventVenue || !eventDate) {
      setError("Please fill out all fields.");
      return;
    }
    const userId = user.data.user._id;
    console.log('====================================');
    console.log(userId);
    console.log('====================================');
    try {
      const response = await axios.post(
        "http://localhost:8000/events/event/events",
        {
          name: eventName,
          description: eventDescription,
          venue: eventVenue,
          date: eventDate,
          userId: userId,
        }
      );

      setSuccess("Event added successfully!");
      // Clear form fields
      setEventName("");
      setEventDescription("");
      setEventVenue("");
      setEventDate("");
      setShowModal(false);
      onAdd();
    } catch (error) {
      setError("Failed to add event. Please try again.");
    }
  };

  return (
    <div className="absolute flex justify-center items-center inset-0 bg-gray-500 bg-opacity-50 w-full z-50">
      <form
        className="flex flex-col gap-5 p-16 shadow-xl rounded-lg bg-white max-w-sm mx-auto"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label htmlFor="eventName">Event Name</label>
          <input
            id="eventName"
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDescription">Event Description</label>
          <input
            id="eventDescription"
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventVenue">Event Venue</label>
          <input
            id="eventVenue"
            type="text"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="eventDate">Choose Date</label>
          <input
            id="eventDate"
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="h-6">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="py-2 px-5 bg-blue-700 rounded-md text-white hover:bg-blue-800"
          >
            Add Event
          </button>
          <button
            onClick={() => setShowModal(false)}
            type="button"
            className="py-2 px-5 bg-white rounded-md text-blue-700 border border-blue-700 hover:bg-gray-100"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EventModal;
