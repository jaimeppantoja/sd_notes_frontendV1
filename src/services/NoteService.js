// import axios from 'axios';

// const API_URL = 'http://localhost:8080/api/notes';

// export const NoteService = {

//     createNote: (note) => axios.post(API_URL, {
//         title: note.title,
//         content: note.content,
//         categories: note.categories || []
//       }),
      
//     updateNote: (id, note) => axios.put(`${API_URL}/${id}`, {
//         title: note.title,
//         content: note.content,
//         categories: note.categories || []
//       }),



  
//   // Delete Note
//   deleteNote: (id) => axios.delete(`${API_URL}/${id}`),
  
//   // Get Active Notes
//   getActiveNotes: () => axios.get(`${API_URL}/active`),
  
//   // Get Archived Notes
//   getArchivedNotes: () => axios.get(`${API_URL}/archived`),
  
//   // Archive Note
//   archiveNote: (id) => axios.post(`${API_URL}/${id}/archive`),
  
//   // Unarchive Note
//   unarchiveNote: (id) => axios.post(`${API_URL}/${id}/unarchive`),
  
//   // Add Category
//   addCategory: (id, category) => 
//     axios.post(`${API_URL}/${id}/categories?category=${category}`),
  
//   // Remove Category
//   removeCategory: (id, category) => 
//     axios.delete(`${API_URL}/${id}/categories?category=${category}`),
  
//   // Get Notes by Category
//   getNotesByCategory: (category) => 
//     axios.get(`${API_URL}/category?category=${category}`)
// };

import axios from 'axios';

const API_URL = 'http://localhost:8080/api/notes'; // Update with your backend URL

const NoteService = {
  createNote: (note) => axios.post(API_URL, note),
};

export default NoteService;
