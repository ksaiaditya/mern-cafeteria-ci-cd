import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Menu from "./pages/CustomerMenu";
import Admin from "./pages/Admin";
import Kitchen from "./pages/Kitchen";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import MyOrders from "./pages/MyOrders";
import QRCodeGenerator from "./pages/QRCodeGenerator";

function App() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  return (
    <Router>
      {/* Navbar always shows */}
      <Navbar />

      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Menu />} /> {/* Default = Menu */}
        <Route path="/menu" element={<Menu />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/cart" element={<Cart />} />

        {/* Protected customer routes */}
        <Route
          path="/checkout"
          element={token ? <Checkout /> : <Navigate to="/login" />}
        />
        <Route
          path="/my-orders"
          element={token ? <MyOrders /> : <Navigate to="/login" />}
        />

        {/* Role-based routes */}
        <Route
          path="/admin"
          element={token && role === "admin" ? <Admin /> : <Navigate to="/login" />}
        />
        <Route
          path="/kitchen"
          element={token && role === "kitchen" ? <Kitchen /> : <Navigate to="/login" />}
        />
        <Route
          path="/qr-code"
          element={token && role === "admin" ? <QRCodeGenerator /> : <Navigate to="/login" />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;
