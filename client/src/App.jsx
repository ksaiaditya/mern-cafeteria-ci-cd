import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Users from "./pages/Users";

export default function App() {
  return (
    <Router>
      <nav className="p-4 bg-gray-200">
        <Link to="/" className="mr-4">Home</Link>
        <Link to="/users">Users</Link>
      </nav>

      <Routes>
        <Route path="/" element={<h1 className="text-center mt-20">Home Page</h1>} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </Router>
  );
}
