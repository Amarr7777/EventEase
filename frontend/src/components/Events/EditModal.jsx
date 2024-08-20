import React, { useState, useEffect } from "react";
import axios from "axios";

function EditModal({ setShowEditModal, onEdit, eventToEdit }) {
  const [eventName, setEventName] = useState("");
  const [eventDescription, setEventDescription] = useState("");
  const [eventVenue, setEventVenue] = useState("");
  const [eventDate, setEventDate] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (eventToEdit) {
      setEventName(eventToEdit.name);
      setEventDescription(eventToEdit.description);
      setEventVenue(eventToEdit.venue);
      setEventDate(new Date(eventToEdit.date).toISOString().split("T")[0]); // format date as YYYY-MM-DD
    }
  }, [eventToEdit]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    setError(""); // Clear previous errors
    setSuccess(""); // Clear previous success messages

    // Basic validation
    if (!eventName || !eventDescription || !eventVenue || !eventDate) {
      setError("Please fill out all fields.");
      return;
    }

    try {
      const updatedEvent = {
        name: eventName,
        description: eventDescription,
        venue: eventVenue,
        date: eventDate,
      };

      const response = await axios.put(`http://localhost:8000/events/event/events/${eventToEdit._id}`, updatedEvent);

      if (response.status >= 200 && response.status < 300) {
        setSuccess("Event updated successfully");
        setEventName("");
        setEventDescription("");
        setEventVenue("");
        setEventDate("");
        setShowEditModal(false);
        onEdit(); // Notify parent to refresh event list
      } else {
        setError("Failed to update event");
      }
    } catch (error) {
      console.error("Error updating event:", error);
      setError("An error occurred while updating the event");
    }
  };

  return (
    <div className="absolute flex justify-center items-center inset-0 bg-transparent backdrop-blur-md w-full z-50">
      <form
        className="flex flex-col gap-5 p-16 shadow-xl rounded-lg bg-white max-h-full max-w-full w-96"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-col">
          <label>Event Name</label>
          <input
            type="text"
            value={eventName}
            onChange={(e) => setEventName(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label>Event Description</label>
          <input
            type="text"
            value={eventDescription}
            onChange={(e) => setEventDescription(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label>Event Venue</label>
          <input
            type="text"
            value={eventVenue}
            onChange={(e) => setEventVenue(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="flex flex-col">
          <label>Choose Date</label>
          <input
            type="date"
            value={eventDate}
            onChange={(e) => setEventDate(e.target.value)}
            className="px-2 py-2 rounded-md border border-slate-300"
          />
        </div>
        <div className="h-6 w-96">
          {error && <p className="text-red-500">{error}</p>}
          {success && <p className="text-green-500">{success}</p>}
        </div>
        <div className="flex gap-2">
          <button
            type="submit"
            className="py-2 px-5 hover:border hover:border-white bg-blue-700 rounded-md text-white w-full"
          >
            Update Event
          </button>
          <button
            onClick={() => setShowEditModal(false)}
            type="button"
            className="py-2 px-5 hover:border hover:border-blue-700 bg-white rounded-md text-blue-700 w-full"
          >
            Close
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditModal;
