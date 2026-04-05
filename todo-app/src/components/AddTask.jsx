import { useState } from 'react';
import './AddTask.css';

export function AddTask({ categories, onAddTask, activeFilter }) {
  const [text, setText] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTask(text.trim(), selectedCategory || null);
      setText('');
      setSelectedCategory('');
    }
  };

  const isCategoryView = activeFilter?.startsWith('cat-');
  const categoryId = isCategoryView ? activeFilter.replace('cat-', '') : null;

  return (
    <form className="add-task" onSubmit={handleSubmit}>
      <div className="input-wrapper">
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="What needs to be done?"
          className="task-input"
        />
        {!isCategoryView && categories.length > 0 && (
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="category-select"
          >
            <option value="">No category</option>
            {categories.map(cat => (
              <option key={cat.id} value={cat.id}>{cat.name}</option>
            ))}
          </select>
        )}
      </div>
      <button type="submit" className="add-btn" disabled={!text.trim()}>
        <span>➕</span> Add Task
      </button>
    </form>
  );
}
