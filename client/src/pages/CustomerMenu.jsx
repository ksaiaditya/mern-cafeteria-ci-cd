import { useEffect, useState } from "react";
import API from "../api/axios";

export default function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [cart, setCart] = useState([]);

  useEffect(() => {
    const fetchMenu = async () => {
      const { data } = await API.get("/menu");
      setMenu(data);
    };
    fetchMenu();
  }, []);

  const addToCart = (item) => {
    setCart([...cart, { ...item, quantity: 1 }]);
  };

  const placeOrder = async () => {
    try {
      const token = localStorage.getItem("token");
      await API.post(
        "/orders",
        { items: cart.map((c) => ({ menuItem: c._id, quantity: c.quantity })) },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert("Order placed successfully!");
      setCart([]);
    } catch (err) {
      console.error(err);
      alert("Failed to place order");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Menu</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {menu.map((item) => (
          <div key={item._id} className="border rounded-lg p-4 shadow">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>{item.description}</p>
            <p className="font-bold">₹{item.price}</p>
            <button
              onClick={() => addToCart(item)}
              className="mt-2 bg-blue-600 text-white px-3 py-1 rounded"
            >
              Add to Cart
            </button>
          </div>
        ))}
      </div>

      {cart.length > 0 && (
        <div className="mt-6 p-4 border rounded-lg shadow bg-gray-100">
          <h2 className="text-xl font-bold">Cart</h2>
          {cart.map((c, i) => (
            <p key={i}>
              {c.name} x {c.quantity}
            </p>
          ))}
          <button
            onClick={placeOrder}
            className="mt-4 w-full bg-green-600 text-white py-2 rounded"
          >
            Place Order
          </button>
        </div>
      )}
    </div>
  );
}
