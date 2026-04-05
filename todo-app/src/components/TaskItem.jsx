import { useState } from 'react';
import './TaskItem.css';

export function TaskItem({ task, onToggle, onEdit, onDelete, category }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(task.text);

  const handleSave = () => {
    if (editText.trim()) {
      onEdit(task.id, editText.trim());
      setIsEditing(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') handleSave();
    if (e.key === 'Escape') { setIsEditing(false); setEditText(task.text); }
  };

  return (
    <div className={`task-item ${task.completed ? 'completed' : ''}`}>
      <label className="checkbox-wrapper">
        <input
          type="checkbox"
          checked={task.completed}
          onChange={() => onToggle(task.id)}
        />
        <span className="checkmark"></span>
      </label>

      {isEditing ? (
        <input
          type="text"
          className="edit-input"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onBlur={handleSave}
          onKeyDown={handleKeyDown}
          autoFocus
        />
      ) : (
        <div className="task-content">
          <span className="task-text" onDoubleClick={() => setIsEditing(true)}>
            {task.text}
          </span>
          {category && (
            <span className="task-category" style={{ backgroundColor: category.color + '20', color: category.color }}>
              {category.name}
            </span>
          )}
        </div>
      )}

      <div className="task-actions">
        <button className="action-btn edit" onClick={() => setIsEditing(true)} title="Edit">
          ✏️
        </button>
        <button className="action-btn delete" onClick={() => onDelete(task.id)} title="Delete">
          🗑️
        </button>
      </div>
    </div>
  );
}
