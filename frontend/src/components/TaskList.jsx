import { useEffect, useState } from "react";
import axios from "axios";
import "./TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editCategory, setEditCategory] = useState("");

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      alert("Failed to load tasks!");
    }
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString();
  };

  const toggleComplete = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  const startEditing = (task) => {
    setEditingTaskId(task._id);
    setEditTitle(task.title);
    setEditCategory(task.category);
  };

  const saveTask = async (id) => {
    await axios.put(`http://localhost:5000/api/tasks/edit/${id}`, {
      title: editTitle,
      category: editCategory,
    });

    setEditingTaskId(null);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`http://localhost:5000/api/tasks/${id}`);
    fetchTasks();
  };

  return (
    <div className="task-list-container">
      <h3>Task List</h3>
      {tasks.map((task) => (
        <div key={task._id} className={`task-card ${task.completed ? "completed" : ""}`}>
          {editingTaskId === task._id ? (
            <div className="task-edit-container">
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                required
              />
              <select value={editCategory} onChange={(e) => setEditCategory(e.target.value)}>
                <option value="Personal">Personal</option>
                <option value="Work">Work</option>
                <option value="Urgent">Urgent</option>
                <option value="Other">Other</option>
              </select>
              <button className="task-btn save-btn" onClick={() => saveTask(task._id)}>Save</button>
              <button className="task-btn cancel-btn" onClick={() => setEditingTaskId(null)}>Cancel</button>
            </div>
          ) : (
            <div>
              <p className="task-title">{task.title}</p>
              <p className="task-details">{task.category} - 🕒 {formatDate(task.createdAt)}</p>
              <div className="task-actions">
                <button className="task-btn complete-btn" onClick={() => toggleComplete(task._id)}>
                  {task.completed ? "Mark as Incomplete" : "Mark as Completed"}
                </button>
                <button className="task-btn edit-btn" onClick={() => startEditing(task)}>Edit</button>
                <button className="task-btn delete-btn" onClick={() => deleteTask(task._id)}>Delete</button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default TaskList;
