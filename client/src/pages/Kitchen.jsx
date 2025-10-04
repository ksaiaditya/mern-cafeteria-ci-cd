import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);

  const fetchOrders = async () => {
    try {
      const { data } = await API.get("/orders");
      setOrders(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    try {
      await API.put(`/orders/${id}`, { status });
      fetchOrders();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">👨‍🍳 Kitchen Dashboard</h1>

      {orders.map((order) => (
        <div key={order._id} className="bg-white shadow-md rounded-xl p-4 mb-4">
          <h2 className="text-lg font-semibold">Order #{order._id}</h2>
          <p>Status: {order.status}</p>
          <ul className="ml-4 list-disc">
            {order.items.map((i, idx) => (
              <li key={idx}>
                {i.menuItem.name} x {i.quantity}
              </li>
            ))}
          </ul>
          <div className="mt-2">
            <button
              onClick={() => updateStatus(order._id, "preparing")}
              className="bg-yellow-500 text-white px-3 py-1 rounded mr-2"
            >
              Preparing
            </button>
            <button
              onClick={() => updateStatus(order._id, "completed")}
              className="bg-green-500 text-white px-3 py-1 rounded"
            >
              Completed
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
