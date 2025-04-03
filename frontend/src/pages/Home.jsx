import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <h1>📝 Task Manager</h1>
      <p>
        Welcome to the **Task Manager App**!  
        This app helps you organize your tasks efficiently by allowing you to:
      </p>
      <ul className="feature-list">
        <li>✅ Add, edit, and delete tasks</li>
        <li>🎯 Categorize tasks as <b>Personal, Work, Urgent, or Other</b></li>
        <li>⏳ Mark tasks as <b>Completed or Pending</b></li>
        <li>📅 See the created time for each task</li>
      </ul>
      <p>Get started by logging in and managing your tasks efficiently!</p>
      
      <div className="button-container">
  <Link to="/login">
    <button className="login-button">Login</button>
  </Link>
  <Link to="/signup">
    <button className="login-button">Signup</button>
  </Link>
</div>

    </div>
  );
};

export default Home;
