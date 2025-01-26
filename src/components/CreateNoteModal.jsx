import React, { useState, useEffect } from "react";
import axios from "axios";

const CreateNoteModal = ({ isOpen, closeModal, onNoteCreated }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [categories, setCategories] = useState(""); // For user input of categories
  const [existingCategories, setExistingCategories] = useState([]); // Existing categories from the backend
  const [selectedCategories, setSelectedCategories] = useState([]); // Categories selected by the user
  const [selectedCategory, setSelectedCategory] = useState(""); // Category selected from the dropdown

  // Fetch categories when modal opens
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/notes/categories");
        setExistingCategories(response.data); // Set the existing categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    if (isOpen) {
      fetchCategories();
    }
  }, [isOpen]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // If no categories are selected, set 'No Category' as default
    const finalCategories = selectedCategories.length === 0 
      ? ['No Category'] // Default category
      : [
          ...new Set([
            ...selectedCategories, // Include selected categories
            ...categories
              .split(",")
              .map((category) => category.trim())
              .filter((category) => category !== ""), // Filter out empty categories
          ]),
        ];

    const newNote = {
      title,
      content,
      categories: finalCategories,
    };

    try {
      await axios.post("http://localhost:8080/api/notes", newNote);
      onNoteCreated(); // Trigger the refresh
      closeModal(); // Close the modal
      // Reset form fields after note creation
      setTitle("");
      setContent("");
      setCategories("");
      setSelectedCategories([]); // Clear selected categories
      setSelectedCategory(""); // Clear selected category dropdown
    } catch (error) {
      console.error("Error adding note:", error);
    }
  };

  const handleCategoryInput = (e) => {
    setCategories(e.target.value);
  };

  const handleCategoryAdd = () => {
    const newCategory = categories.trim();
    // Add the manually typed category to selectedCategories if it's not empty and not already added
    if (newCategory && !selectedCategories.includes(newCategory)) {
      setSelectedCategories((prev) => [...prev, newCategory]);
      setCategories(""); // Clear the input field after adding
    }
  };

  const handleCategoryRemove = (category) => {
    setSelectedCategories((prev) => prev.filter((item) => item !== category)); // Remove category from selected list
  };

  const handleDropdownCategorySelect = (e) => {
    const category = e.target.value;
    if (category && !selectedCategories.includes(category)) {
      setSelectedCategories((prev) => [...prev, category]);
      setSelectedCategory(""); // Clear dropdown selection
    }
  };

  if (!isOpen) return null; // Don't render modal if it's not open

  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Note</h2>
        <form onSubmit={handleSubmit}>
          
          <div className="modal-title">
            <label>Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              maxLength={50}
            />
          </div>
          <div>
            <label>Content</label>
            <textarea
              className="content-textarea"  
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
          </div>
          
          <div>
            <div className="modal-categories">
            <label></label>
            <input
              type="text"
              value={categories}
              onChange={handleCategoryInput}
            />
            <div className="add-button">
            <button 
              type="button"
              onClick={handleCategoryAdd} // Add category on button click
            >
              Add Category
            </button>
            </div>
            </div>
            <div>
              <label>Existing Categories:</label>
              <select
                onChange={handleDropdownCategorySelect} // Add selected category from dropdown
                value={selectedCategory}
              >
                <option value="">Select Category</option>
                {existingCategories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>
            <div>
              {selectedCategories.length > 0 && (
                <div>
                  <p>Selected Categories:</p>
                  {selectedCategories.map((category) => (                    
                    <span key={category} className="category-container">
                      <div className="close-button">
                      <button  type="button" onClick={() => handleCategoryRemove(category)}>
                        X
                      </button>
                      </div>
                      {category}{" "}                 
                      
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
          <div className="modal-buttons-create">
            <button type="submit">Save Note</button>
            <button type="button" onClick={closeModal}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateNoteModal;
