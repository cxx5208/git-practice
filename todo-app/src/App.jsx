import { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import { Sidebar } from './components/Sidebar';
import { AddTask } from './components/AddTask';
import { TaskList } from './components/TaskList';
import './App.css';

const CATEGORY_COLORS = ['#e91e63', '#9c27b0', '#673ab7', '#3f51b5', '#2196f3', '#00bcd4', '#009688', '#ff5722', '#795548'];

function App() {
  const [tasks, setTasks] = useLocalStorage('todos', []);
  const [categories, setCategories] = useLocalStorage('categories', []);
  const [activeFilter, setActiveFilter] = useState('all');

  const filteredTasks = useMemo(() => {
    switch (activeFilter) {
      case 'active':
        return tasks.filter(t => !t.completed);
      case 'completed':
        return tasks.filter(t => t.completed);
      default:
        if (activeFilter.startsWith('cat-')) {
          const catId = activeFilter.replace('cat-', '');
          return tasks.filter(t => t.categoryId === catId);
        }
        return tasks;
    }
  }, [tasks, activeFilter]);

  const getFilterTitle = () => {
    if (activeFilter === 'all') return 'All Tasks';
    if (activeFilter === 'active') return 'Active Tasks';
    if (activeFilter === 'completed') return 'Completed';
    if (activeFilter.startsWith('cat-')) {
      const cat = categories.find(c => c.id === activeFilter.replace('cat-', ''));
      return cat?.name || 'Tasks';
    }
    return 'Tasks';
  };

  const addTask = (text, categoryId) => {
    const newTask = {
      id: Date.now().toString(),
      text,
      completed: false,
      categoryId,
      createdAt: new Date().toISOString(),
    };
    setTasks([newTask, ...tasks]);
  };

  const toggleTask = (id) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const editTask = (id, text) => {
    setTasks(tasks.map(t => t.id === id ? { ...t, text } : t));
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter(t => t.id !== id));
  };

  const addCategory = (name) => {
    const color = CATEGORY_COLORS[categories.length % CATEGORY_COLORS.length];
    const newCategory = {
      id: Date.now().toString(),
      name,
      color,
    };
    setCategories([...categories, newCategory]);
  };

  return (
    <div className="app">
      <Sidebar
        categories={categories}
        activeFilter={activeFilter}
        onFilterChange={setActiveFilter}
        onAddCategory={addCategory}
      />
      <main className="main-content">
        <header className="header">
          <h2>{getFilterTitle()}</h2>
          <span className="task-count">{filteredTasks.length} tasks</span>
        </header>
        <AddTask
          categories={categories}
          onAddTask={addTask}
          activeFilter={activeFilter}
        />
        <TaskList
          tasks={filteredTasks}
          onToggle={toggleTask}
          onEdit={editTask}
          onDelete={deleteTask}
          categories={categories}
        />
      </main>
    </div>
  );
}

export default App;
