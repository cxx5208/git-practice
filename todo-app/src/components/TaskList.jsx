import { TaskItem } from './TaskItem';
import './TaskList.css';

export function TaskList({ tasks, onToggle, onEdit, onDelete, categories }) {
  const getCategory = (categoryId) => {
    return categories.find(c => c.id === categoryId);
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <div className="empty-icon">🎉</div>
        <h3>All done!</h3>
        <p>No tasks here. Add one above!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          category={task.categoryId ? getCategory(task.categoryId) : null}
          onToggle={onToggle}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
