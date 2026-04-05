import { useState } from 'react';
import './Sidebar.css';

export function Sidebar({ categories, activeFilter, onFilterChange, onAddCategory }) {
  const [newCategoryName, setNewCategoryName] = useState('');
  const [isAdding, setIsAdding] = useState(false);

  const smartLists = [
    { id: 'all', name: 'All Tasks', icon: '📋' },
    { id: 'active', name: 'Active', icon: '✅' },
    { id: 'completed', name: 'Completed', icon: '🎉' },
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      onAddCategory(newCategoryName.trim());
      setNewCategoryName('');
      setIsAdding(false);
    }
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h1>📝 Todo</h1>
      </div>

      <nav className="smart-lists">
        {smartLists.map(list => (
          <button
            key={list.id}
            className={`sidebar-item ${activeFilter === list.id ? 'active' : ''}`}
            onClick={() => onFilterChange(list.id)}
          >
            <span className="icon">{list.icon}</span>
            <span>{list.name}</span>
          </button>
        ))}
      </nav>

      <div className="categories-section">
        <h3>Categories</h3>
        {categories.map(category => (
          <button
            key={category.id}
            className={`sidebar-item category ${activeFilter === `cat-${category.id}` ? 'active' : ''}`}
            onClick={() => onFilterChange(`cat-${category.id}`)}
          >
            <span className="category-dot" style={{ backgroundColor: category.color }}></span>
            <span>{category.name}</span>
          </button>
        ))}

        {isAdding ? (
          <div className="add-category-form">
            <input
              type="text"
              value={newCategoryName}
              onChange={(e) => setNewCategoryName(e.target.value)}
              placeholder="Category name"
              onKeyDown={(e) => e.key === 'Enter' && handleAddCategory()}
              autoFocus
            />
            <div className="add-category-buttons">
              <button onClick={handleAddCategory}>Add</button>
              <button onClick={() => { setIsAdding(false); setNewCategoryName(''); }}>Cancel</button>
            </div>
          </div>
        ) : (
          <button className="sidebar-item add-category-btn" onClick={() => setIsAdding(true)}>
            <span className="icon">➕</span>
            <span>Add Category</span>
          </button>
        )}
      </div>
    </aside>
  );
}
