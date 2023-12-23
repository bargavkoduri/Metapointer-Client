import Dashboard from "./Dashboard";
import LoginForm from "./Login";
import RegisterForm from "./Register";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm/>}/>
        <Route path="/register" element={<RegisterForm/>}/>
        <Route path="/dashboard" element={<Dashboard/>}/>
      </Routes>
    </Router>
  </div>;
}

export default App;
