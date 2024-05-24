import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [url, setUrl] = useState('');
  const [category, setCategory] = useState('');
  const [bookmarks, setBookmarks] = useState({});
  const [newCategory, setNewCategory] = useState('');
  const [categories, setCategories] = useState(['Movies', 'Songs']);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!url || !category) return;

    setBookmarks(prevBookmarks => {
      const updatedBookmarks = { ...prevBookmarks };
      if (!updatedBookmarks[category]) {
        updatedBookmarks[category] = [];
      }
      updatedBookmarks[category].push(url);
      return updatedBookmarks;
    });

    setUrl('');
    setCategory('');
  };

  const handleAddCategory = (e) => {
    e.preventDefault();
    if (!newCategory) return;

    setCategories(prevCategories => [...prevCategories, newCategory]);
    setNewCategory('');
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>Bookmark Manager</h1>
      </header>
      <div className="App-content">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Enter URL"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option value="" disabled>Select category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat}>{cat}</option>
            ))}
          </select>
          <button type="submit">Add Bookmark</button>
        </form>

        <form onSubmit={handleAddCategory}>
          <input
            type="text"
            placeholder="New Category"
            value={newCategory}
            onChange={(e) => setNewCategory(e.target.value)}
          />
          <button type="submit">Add Category</button>
        </form>

        <div className="bookmarks">
          {Object.keys(bookmarks).map((cat, index) => (
            <div key={index} className="category">
              <h2>{cat}</h2>
              <ul>
                {bookmarks[cat].map((link, i) => (
                  <li key={i}><a href={link} target="_blank" rel="noopener noreferrer">{link}</a></li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;

