import React, { useState } from 'react';
import NoteService from '../services/NoteService';

const NoteForm = () => {
  const [note, setNote] = useState({
    title: '',
    content: '',
    categories: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNote({ ...note, [name]: value });
  };

  const handleCategoryChange = (e) => {
    setNote({ ...note, categories: e.target.value.split(',') }); // Split categories by comma
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await NoteService.createNote(note);
      console.log('Note created successfully:', response.data);
      alert('Note created successfully!');
      setNote({ title: '', content: '', categories: [] }); // Reset form
    } catch (error) {
      console.error('Error creating note:', error.response?.data || error.message);
      alert('Failed to create note. Check the console for details.');
    }
  };

  return (
    <div className="note-form">
      <h2>Create a New Note</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            name="title"
            value={note.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Content:</label>
          <textarea
            name="content"
            value={note.content}
            onChange={handleChange}
          ></textarea>
        </div>
        <div>
          <label>Categories (comma-separated):</label>
          <input
            type="text"
            name="categories"
            value={note.categories.join(',')}
            onChange={handleCategoryChange}
          />
        </div>
        <button type="submit">Save Note</button>
      </form>
    </div>
  );
};

export default NoteForm;
