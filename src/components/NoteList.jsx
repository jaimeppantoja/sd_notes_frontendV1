// import React, { useState, useEffect } from 'react';
// import { NoteService } from '../services/NoteService';
// import { Button, Card, Modal, Form } from 'react-bootstrap';

// export function NoteList() {
//   const [notes, setNotes] = useState([]);
//   const [archivedNotes, setArchivedNotes] = useState([]);
//   const [showModal, setShowModal] = useState(false);
//   const [currentNote, setCurrentNote] = useState({
//     title: '',
//     content: '',
//     categories: []
//   });
//   const [filter, setFilter] = useState('');

//   useEffect(() => {
//     loadNotes();
//   }, []);

//   const loadNotes = async () => {
//     try {
//       const activeResponse = await NoteService.getActiveNotes();
//       const archivedResponse = await NoteService.getArchivedNotes();
//       setNotes(activeResponse.data);
//       setArchivedNotes(archivedResponse.data);
//     } catch (error) {
//       console.error('Error loading notes', error);
//     }
//   };

//   const handleSaveNote = async () => {
//     try {
//       if (currentNote.id) {
//         await NoteService.updateNote(currentNote.id, currentNote);
//       } else {
//         await NoteService.createNote(currentNote);
//       }
//       loadNotes();
//       setShowModal(false);
//     } catch (error) {
//       console.error('Error saving note', error);
//     }
//   };

//   const handleDeleteNote = async (id) => {
//     try {
//       await NoteService.deleteNote(id);
//       loadNotes();
//     } catch (error) {
//       console.error('Error deleting note', error);
//     }
//   };

//   const handleArchiveNote = async (id, isArchiving) => {
//     try {
//       isArchiving 
//         ? await NoteService.archiveNote(id)
//         : await NoteService.unarchiveNote(id);
//       loadNotes();
//     } catch (error) {
//       console.error('Error archiving/unarchiving note', error);
//     }
//   };

//   const handleAddCategory = async (id, category) => {
//     try {
//       await NoteService.addCategory(id, category);
//       loadNotes();
//     } catch (error) {
//       console.error('Error adding category', error);
//     }
//   };

//   const handleRemoveCategory = async (id, category) => {
//     try {
//       await NoteService.removeCategory(id, category);
//       loadNotes();
//     } catch (error) {
//       console.error('Error removing category', error);
//     }
//   };

//   const filteredNotes = notes.filter(note => 
//     !filter || note.categories.includes(filter)
//   );

//   const filteredArchivedNotes = archivedNotes.filter(note => 
//     !filter || note.categories.includes(filter)
//   );

//   return (
//     <div>
//       <h2>Notes App</h2>
      
//       {/* Category Filter */}
//       <Form.Control 
//         type="text" 
//         placeholder="Filter by category" 
//         value={filter}
//         onChange={(e) => setFilter(e.target.value)}
//       />

//       {/* Add New Note Button */}
//       <Button onClick={() => {
//         setCurrentNote({title: '', content: '', categories: []});
//         setShowModal(true);
//       }}>
//         Add New Note
//       </Button>

//       {/* Active Notes */}
//       <h3>Active Notes</h3>
//       {filteredNotes.map(note => (
//         <Card key={note.id}>
//           <Card.Body>
//             <Card.Title>{note.title}</Card.Title>
//             <Card.Text>{note.content}</Card.Text>
            
//             {/* Categories */}
//             <div>
//               {note.categories.map(category => (
//                 <span key={category}>
//                   {category}
//                   <Button 
//                     size="sm" 
//                     onClick={() => handleRemoveCategory(note.id, category)}
//                   >
//                     x
//                   </Button>
//                 </span>
//               ))}
//             </div>

//             {/* Note Actions */}
//             <Button onClick={() => {
//               setCurrentNote(note);
//               setShowModal(true);
//             }}>
//               Edit
//             </Button>
//             <Button onClick={() => handleDeleteNote(note.id)}>
//               Delete
//             </Button>
//             <Button onClick={() => handleArchiveNote(note.id, true)}>
//               Archive
//             </Button>
//           </Card.Body>
//         </Card>
//       ))}

//       {/* Archived Notes */}
//       <h3>Archived Notes</h3>
//       {filteredArchivedNotes.map(note => (
//         <Card key={note.id}>
//           <Card.Body>
//             <Card.Title>{note.title}</Card.Title>
//             <Card.Text>{note.content}</Card.Text>
            
//             <Button onClick={() => handleArchiveNote(note.id, false)}>
//               Unarchive
//             </Button>
//           </Card.Body>
//         </Card>
//       ))}

//       {/* Note Modal */}
//       <Modal show={showModal} onHide={() => setShowModal(false)}>
//         <Modal.Header>
//           <Modal.Title>
//             {currentNote.id ? 'Edit Note' : 'Create Note'}
//           </Modal.Title>
//         </Modal.Header>
//         <Modal.Body>
//           <Form>
//             <Form.Group>
//               <Form.Label>Title</Form.Label>
//               <Form.Control 
//                 type="text"
//                 value={currentNote.title}
//                 onChange={(e) => setCurrentNote({
//                   ...currentNote, 
//                   title: e.target.value
//                 })}
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Content</Form.Label>
//               <Form.Control 
//                 as="textarea"
//                 value={currentNote.content}
//                 onChange={(e) => setCurrentNote({
//                   ...currentNote, 
//                   content: e.target.value
//                 })}
//               />
//             </Form.Group>
//             <Form.Group>
//               <Form.Label>Categories</Form.Label>
//               <Form.Control 
//                 type="text"
//                 placeholder="Add category"
//                 onKeyPress={(e) => {
//                   if (e.key === 'Enter') {
//                     const newCategory = e.target.value.trim();
//                     if (newCategory) {
//                       setCurrentNote({
//                         ...currentNote,
//                         categories: [...currentNote.categories, newCategory]
//                       });
//                       e.target.value = '';
//                     }
//                   }
//                 }}
//               />
//               {currentNote.categories.map(category => (
//                 <span key={category}>
//                   {category}
//                   <Button 
//                     size="sm" 
//                     onClick={() => setCurrentNote({
//                       ...currentNote,
//                       categories: currentNote.categories.filter(c => c !== category)
//                     })}
//                   >
//                     x
//                   </Button>
//                 </span>
//               ))}
//             </Form.Group>
//           </Form>
//         </Modal.Body>
//         <Modal.Footer>
//           <Button onClick={handleSaveNote}>Save</Button>
//           <Button onClick={() => setShowModal(false)}>Cancel</Button>
//         </Modal.Footer>
//       </Modal>
//     </div>
//   );
// }

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
