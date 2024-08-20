import React, { useEffect, useState } from 'react';
import Header from '../components/Header/Header';
import EventCard from '../components/Events/EventCard';
import EventModal from '../components/Events/EventModal';
import axios from 'axios';
import EditModal from '../components/Events/EditModal';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [events, setEvents] = useState([]);
  const [user, setUser] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null); // Added state to hold selected event for editing
  const [eventsFetched, setEventsFetched] = useState(false);

  const navigate = useNavigate();

  // Fetch events from the backend
  const fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:8000/events/event/events');
      setEvents(response.data);
      setEventsFetched(true);
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  };

  const fetchUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.get('http://localhost:8000/users/users/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser(response.data);
    } catch (error) {
      console.error('Error fetching user profile:', error);
    }
  };
 
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }
    if (!eventsFetched) {
      fetchUser()
      fetchEvents();
    }
  }, []); 

  const handleEdit = (event) => {
    setSelectedEvent(event);
    setShowEditModal(true);
  };

  return (
    <div>
      {showModal && <EventModal user={user} setShowModal={setShowModal} onAdd={fetchEvents} />}
      {showEditModal && (
        <EditModal
          setShowEditModal={setShowEditModal}
          onEdit={fetchEvents}
          eventToEdit={selectedEvent} // Pass the selected event to the EditModal
        />
      )}
      <Header setShowModal={setShowModal} />
      <div className="flex flex-col gap-5 justify-center items-center p-5">
        {events.map((event) => (
          <EventCard
            key={event._id}
            event={event}
            onDelete={fetchEvents}
            setShowEditModal={setShowEditModal}
            onEdit={() => handleEdit(event)} // Pass edit handler
          />
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
