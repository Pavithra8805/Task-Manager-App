import React from "react";
import { useNavigate } from "react-router-dom";
import "../App.css";

const Navbar = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate("/")}>Task Manager</div>
      <ul className="nav-links">
        <li><button className="nav-btn" onClick={() => navigate("/")}>Home</button></li>

        {token ? (
          <>
            <li><button className="nav-btn" onClick={() => navigate("/dashboard")}>Dashboard</button></li>
            <li><button className="nav-btn add-task-btn" onClick={() => navigate("/TaskForm")}>+ Add Task</button></li>
            <li><button className="nav-btn logout-btn" onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <>
            <li><button className="nav-btn" onClick={() => navigate("/login")}>Login</button></li>
            <li><button className="nav-btn" onClick={() => navigate("/signup")}>Signup</button></li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
