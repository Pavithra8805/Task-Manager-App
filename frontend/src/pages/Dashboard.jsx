import { useNavigate } from "react-router-dom";
import TaskList from "../components/TaskList";
import NavBar from "../components/Navbar";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <div className="dashboard-container">
      <NavBar />

      <div className="dashboard-content">
        <TaskList />
      </div>
    </div>
  );
};

export default Dashboard;
