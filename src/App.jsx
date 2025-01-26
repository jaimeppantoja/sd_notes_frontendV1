import React, { useState } from "react";
import Login from './components/Login';  // Import the Login component
import NotesList from './components/NotesList';
import CreateNoteModal from './components/CreateNoteModal';
import './App.css';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Track if user is logged in
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [refreshTrigger, setRefreshTrigger] = useState(false); // State for refreshing notes
  const [view, setView] = useState("all");  // State for view (all, active, archived)
  const [activeView, setActiveView] = useState("all"); // State for tracking active button

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleNoteCreated = () => {
    setRefreshTrigger(prev => !prev); // Trigger re-fetch when a new note is created
  };

  const handleViewChange = (viewType) => {
    setView(viewType); // Change the view
    setActiveView(viewType); // Set the active button based on the clicked view
  };

  const handleLogin = () => {
    setIsLoggedIn(true);  // Set isLoggedIn to true after a successful login
  };

  const handleLogout = () => {
    setIsLoggedIn(false);  // Set isLoggedIn to false to log out
  };

  return (
    <div className="App">
      <header>
        <h1>Note Management App</h1>
      </header>

      {/* Conditionally render login or home page */}
      {!isLoggedIn ? (
        <Login onLogin={handleLogin} />  // Show login page if not logged in
      ) : (
        <div>
          {/* Logout button */}
          <div className="logout-button">
            <button onClick={handleLogout}>Log Out</button>
          </div>

          <div className="main-button">
            <button onClick={openModal}>Create New Note</button>
            <CreateNoteModal
              isOpen={isModalOpen}
              closeModal={closeModal}
              onNoteCreated={handleNoteCreated}
            />
          </div>

          {/* View buttons with active state */}
          <div className="view-buttons">      
            <button
              className={activeView === "all" ? "active" : ""}
              onClick={() => handleViewChange("all")}
            >
              Show All Notes
            </button>
            <button
              className={activeView === "active" ? "active" : ""}
              onClick={() => handleViewChange("active")}
            >
              Show Active Notes
            </button>
            <button
              className={activeView === "archived" ? "active" : ""}
              onClick={() => handleViewChange("archived")}
            >
              Show Archived Notes
            </button>
          </div>

          {/* Render Notes based on selected view */}
          <div>
            {view === "all" ? (
              <NotesList
                apiUrl="http://localhost:8080/api/notes/all"
                title="All Notes"
                refreshTrigger={refreshTrigger}
              />
            ) : view === "active" ? (
              <NotesList
                apiUrl="http://localhost:8080/api/notes/active"
                title="Active Notes"
                refreshTrigger={refreshTrigger}
              />
            ) : (
              <NotesList
                apiUrl="http://localhost:8080/api/notes/archived"
                title="Archived Notes"
                refreshTrigger={refreshTrigger}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
