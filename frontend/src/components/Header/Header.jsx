import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

function Header({ setShowModal }) {
  const navigate = useNavigate();

  const handleLogout = async () => {
    localStorage.removeItem('authToken');
    navigate('/'); 
  };

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (!token) {
      navigate('/'); // Redirect to login if not authenticated
    }
  }, [navigate]);

  return (
    <header className="bg-white">
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8">
        <div className="flex flex-col items-start gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
              EventEase
            </h1>

            <p className="mt-1.5 text-sm text-gray-500">
              Your Partner in Event Perfection
            </p>
          </div>

          <div className="flex items-center gap-4">
            <button
              className="inline-flex items-center justify-center gap-1.5 rounded border border-gray-200 bg-white px-5 py-3 text-gray-900 transition hover:text-gray-700 focus:outline-none focus:ring"
              type="button"
              onClick={() => setShowModal(true)}
            >
              <span className="text-sm font-medium">Create Event</span>
            </button>

            <button
              className="inline-block rounded bg-indigo-600 px-5 py-3 text-sm font-medium text-white transition hover:bg-indigo-700 focus:outline-none focus:ring"
              type="button"
              onClick={handleLogout} // Call handleLogout on click
            >
              Log Out
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
