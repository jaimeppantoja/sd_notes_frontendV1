import React, { useEffect, useState } from "react";
import axios from "axios";
import EditNoteModal from "./EditNoteModal";

const NotesList = ({ apiUrl, title, refreshTrigger, view }) => {
  const [notes, setNotes] = useState([]); // State to store notes
  const [categories, setCategories] = useState([]); // State to store categories
  const [selectedCategory, setSelectedCategory] = useState(""); // State for selected category
  const [loading, setLoading] = useState(true); // State to handle loading
  const [error, setError] = useState(null); // State to handle errors
  const [modalOpen, setModalOpen] = useState(false); // State to control modal visibility
  const [currentNote, setCurrentNote] = useState(null); // State to store the current note being edited

  // Function to fetch notes
  const fetchNotes = async () => {
    try {
      setLoading(true);
      const response = await axios.get(apiUrl); // Fetch notes based on the current view (all, active, archived)
      setNotes(response.data); // Update the notes state
      setLoading(false); // Set loading to false
    } catch (err) {
      setError(err.message); // Set error message
      setLoading(false); // Set loading to false
    }
  };

  // Function to fetch available categories
  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/notes/categories");
      setCategories(response.data);
    } catch (err) {
      console.error("Error fetching categories:", err);
    }
  };

  // Function to handle category change
  const handleCategoryChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  // Function to filter notes by category
  const filterNotesByCategory = (notes, selectedCategory) => {
    if (!selectedCategory) return notes; // No filter, return all notes
    return notes.filter((note) =>
      note.categories?.includes(selectedCategory)
    );
  };

  // Function to handle archiving/unarchiving a note
  const handleArchiveToggle = async (id) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/notes/${id}/archive`);
      const updatedNotes = notes.map((note) =>
        note.id === id ? { ...note, archived: response.data.archived } : note
      );
      setNotes(updatedNotes);
    } catch (err) {
      console.error("Error updating note:", err);
    }
  };

// Function to handle deleting a note
    const handleDelete = async (id) => {
        try {
        await axios.delete(`http://localhost:8080/api/notes/${id}`);
        const updatedNotes = notes.filter((note) => note.id !== id);
        setNotes(updatedNotes);
        
        // Re-fetch categories to update the category dropdown
        fetchCategories();
        } catch (err) {
        console.error("Error deleting note:", err);
        }
    };
  

  // Function to handle editing a note
  const handleEdit = (note) => {
    setCurrentNote(note); // Set the note to be edited
    setModalOpen(true); // Open the modal
  };

  // Use useEffect to fetch notes and categories on mount and when dependencies change
  useEffect(() => {
    fetchNotes();
    fetchCategories();
  }, [apiUrl, refreshTrigger]); // Fetch notes when apiUrl or refreshTrigger changes

  // Filter the notes based on the selected category
  const filteredNotes = filterNotesByCategory(notes, selectedCategory);

  if (loading) {
    return <p>Loading {title.toLowerCase()}...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div>
      <div className="title-notes">
        <h2>{title}:</h2>
    
        {/* Category Filter */}
        <div>
            <label htmlFor="categoryFilter">Filter by Category </label>
            <select
            id="categoryFilter"
            value={selectedCategory}
            onChange={handleCategoryChange}
            >
            <option value="">All Categories</option>
            {categories.map((category) => (
                <option key={category} value={category}>
                {category}
                </option>
            ))}
            </select>
        </div>
      </div>
  
      {/* Notes List */}
      {filteredNotes.length > 0 ? (
        <div className="notes-container">
          {filteredNotes.map((note) => (
            <div key={note.id} className="note-card">
              <div className="container-title-card">
              <h3 className="title-card">{note.title}</h3>
              </div>
              <p id="card-content">{note.content}</p>
              
                {note.categories?.length > 0 && (
                    <p>
                    <strong>Categories:</strong> {note.categories.join(", ")}
                    </p>
                )}
                <p>
                    <strong>Created At:</strong> {new Date(note.createdAt).toLocaleString()}
                </p>
              
              <div className="archive-info">
                <label>
                  <input
                    type="checkbox"
                    checked={note.archived}
                    onChange={() => handleArchiveToggle(note.id)}
                  />
                  Archived
                  {/*{note.archived ? "Unarchive" : "Archive"}*/}
                </label>
              </div>
              <div className="card-buttons">
              <button className="edit-button" onClick={() => handleEdit(note)}>Edit</button>
              <button className="delete-button" onClick={() => handleDelete(note.id)}>Delete</button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>No '{title.toLowerCase()}' found in this category.</p>
      )}
  
      {/* Modal for editing a note */}
      <EditNoteModal
        isOpen={modalOpen}
        closeModal={() => setModalOpen(false)}
        noteData={currentNote}
        onNoteUpdated={() => fetchNotes()} // Refresh the notes list after updating
      />
    </div>
  );
  
};

export default NotesList;