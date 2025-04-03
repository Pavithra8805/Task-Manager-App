import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Signup from "./pages/signup";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Home";
import  NavBar from ".//components/Navbar";
import  TaskForm from "./components/TaskForm"
import TaskList from "./components/TaskList";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/TaskForm" element={<TaskForm/>}/> 
        <Route path="/TaskList" element={<TaskList/>}/>
        
      </Routes>
    </Router>
  );
};

export default App;
