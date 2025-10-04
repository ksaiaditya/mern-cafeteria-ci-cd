import API from "../api/axios";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart } = useCart();
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.post(
        "/orders",
        { items: cart },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      clearCart();
      navigate("/");
    } catch (err) {
      console.error("Order failed", err);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Checkout</h2>
      <ul>
        {cart.map((item, idx) => (
          <li key={idx}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>
      <button
        onClick={handleOrder}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded"
      >
        Confirm Order
      </button>
    </div>
  );
}
