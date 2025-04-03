import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";


const TaskForm = ({ fetchTasks }) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("Personal");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title) return alert("Task title is required!");

    const currentTime = new Date().toISOString();

    await axios.post("http://localhost:5000/api/tasks/add", { 
      title, 
      category, 
      createdAt: currentTime
    });

    setTitle("");
    setCategory("Personal");
    fetchTasks();

    setSuccessMessage("✅ Task added successfully!");

    setTimeout(() => {
      setSuccessMessage("✅ Task added successfully!");
      navigate("/dashboard");
    }, 2000);
  };

  return (
    <div>
    <NavBar />

    <div className="task-form-container">
      <style>
        {`
          .task-form-container {
            max-width: 450px;
            margin: 50px auto;
            padding: 25px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 5px 15px rgba(0, 0, 0, 0.15);
            text-align: center;
          }
          
          .task-form {
            display: flex;
            flex-direction: column;
            gap: 15px;
          }

          input, select, button {
            padding: 12px;
            font-size: 16px;
            border: 1px solid #ccc;
            border-radius: 5px;
          }

          button {
            background: #007bff;
            color: white;
            font-weight: bold;
            cursor: pointer;
            transition: background 0.3s ease-in-out;
            border: none;
          }

          button:hover {
            background: #0056b3;
          }

          .success-message {
            margin-top: 15px;
            padding: 12px;
            background: #28a745;
            color: white;
            border-radius: 5px;
            font-weight: bold;
            font-size: 16px;
            animation: fadeIn 0.5s ease-in-out;
          }

          @keyframes fadeIn {
            from {
              opacity: 0;
              transform: translateY(-10px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>

      <h2>Add a New Task</h2>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          placeholder="Enter task title..."
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="Personal">Personal</option>
          <option value="Work">Work</option>
          <option value="Urgent">Urgent</option>
          <option value="Other">Other</option>
        </select>

        <button type="submit" onClick={()=> navigate('/dashboard')}>Add Task</button>
      </form>

      {successMessage && <p className="success-message">{successMessage}</p>}
    </div>
  </div>
);
};

export default TaskForm;