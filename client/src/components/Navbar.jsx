import { Link, useNavigate } from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 text-white px-6 py-3 flex justify-between items-center shadow-lg">
      <Link to="/" className="text-xl font-bold">
        🍴 QR Menu
      </Link>

      <div className="flex gap-4 items-center">
        {/* Links for everyone */}
        <Link to="/menu" className="hover:text-gray-200">
          Menu
        </Link>

        {/* Role-based links */}
        {role === "admin" && (
          <>
            <Link to="/admin" className="hover:text-gray-200">
              📊 Admin
            </Link>
            <Link to="/qr-code" className="hover:text-gray-200">
              📱 QR Code
            </Link>
          </>
        )}
        {role === "kitchen" && (
          <Link to="/kitchen" className="hover:text-gray-200">
            👨‍🍳 Kitchen
          </Link>
        )}
        {token && (
          <>
            <Link to="/cart" className="hover:text-gray-200">
              🛒 Cart
            </Link>
            <Link to="/my-orders" className="hover:text-gray-200">
              📋 My Orders
            </Link>
          </>
        )}

        {/* Auth buttons */}
        {!token ? (
          <>
            <Link to="/login" className="hover:text-gray-200">
              Login
            </Link>
            <Link to="/register" className="hover:text-gray-200">
              Register
            </Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
          >
            Logout
          </button>
        )}
      </div>
    </nav>
  );
}
