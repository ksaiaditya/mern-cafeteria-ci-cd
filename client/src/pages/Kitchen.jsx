import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Kitchen() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");
  const [autoRefresh, setAutoRefresh] = useState(true);

  const fetchOrders = async () => {
    try {
      const token = localStorage.getItem("token");
      const { data } = await API.get("/orders", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setOrders(data);
    } catch (err) {
      console.error("Failed to fetch orders:", err);
    }
  };

  useEffect(() => {
    fetchOrders();
    
    // Auto-refresh every 10 seconds if enabled
    if (autoRefresh) {
      const interval = setInterval(fetchOrders, 10000);
      return () => clearInterval(interval);
    }
  }, [autoRefresh]);

  const updateStatus = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      await API.put(`/orders/${id}`, { status }, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchOrders();
    } catch (err) {
      console.error("Failed to update order:", err);
      alert("Failed to update order status");
    }
  };

  const getTimeSince = (date) => {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    if (seconds < 60) return `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    return `${hours}h ago`;
  };

  const filteredOrders = orders.filter((order) => {
    if (filter === "all") return true;
    return order.status === filter;
  });

  const pendingCount = orders.filter((o) => o.status === "pending").length;
  const preparingCount = orders.filter((o) => o.status === "preparing").length;
  const completedCount = orders.filter((o) => o.status === "completed").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-orange-600 to-red-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">👨‍🍳 Kitchen Dashboard</h1>
        <p className="text-orange-100">Manage incoming orders</p>
      </div>

      <div className="container mx-auto p-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pending Orders</p>
            <p className="text-4xl font-bold text-yellow-600">{pendingCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Preparing</p>
            <p className="text-4xl font-bold text-blue-600">{preparingCount}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Completed Today</p>
            <p className="text-4xl font-bold text-green-600">{completedCount}</p>
          </div>
        </div>

        {/* Controls */}
        <div className="bg-white rounded-xl shadow-md p-4 mb-6 flex flex-wrap gap-4 items-center justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === "all"
                  ? "bg-orange-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              All ({orders.length})
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === "pending"
                  ? "bg-yellow-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Pending ({pendingCount})
            </button>
            <button
              onClick={() => setFilter("preparing")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === "preparing"
                  ? "bg-blue-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Preparing ({preparingCount})
            </button>
            <button
              onClick={() => setFilter("completed")}
              className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                filter === "completed"
                  ? "bg-green-600 text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              Completed ({completedCount})
            </button>
          </div>

          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoRefresh}
                onChange={(e) => setAutoRefresh(e.target.checked)}
                className="w-5 h-5"
              />
              <span className="text-sm font-semibold text-gray-700">Auto-refresh</span>
            </label>
            <button
              onClick={fetchOrders}
              className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded-lg font-semibold transition-all"
            >
              🔄 Refresh
            </button>
          </div>
        </div>

        {/* Orders Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredOrders.length === 0 ? (
            <div className="col-span-2 text-center py-12">
              <p className="text-4xl mb-4">🍽️</p>
              <p className="text-xl text-gray-600">No orders to display</p>
            </div>
          ) : (
            filteredOrders.map((order) => (
              <div
                key={order._id}
                className={`bg-white shadow-md rounded-xl p-6 border-l-4 ${
                  order.status === "pending"
                    ? "border-yellow-500"
                    : order.status === "preparing"
                    ? "border-blue-500"
                    : "border-green-500"
                }`}
              >
                {/* Order Header */}
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-bold text-lg">#{order._id.slice(-8)}</p>
                    {order.customerName && (
                      <p className="text-sm text-gray-600 mt-1">
                        Customer: {order.customerName}
                      </p>
                    )}
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">
                      {getTimeSince(order.createdAt)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(order.createdAt).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Order Items */}
                <div className="mb-4">
                  <h3 className="font-semibold text-gray-800 mb-2">Items:</h3>
                  <ul className="space-y-2">
                    {order.items.map((item, idx) => (
                      <li
                        key={idx}
                        className="flex justify-between items-center bg-gray-50 p-3 rounded-lg"
                      >
                        <div className="flex items-center gap-3">
                          <span className="text-2xl">🍽️</span>
                          <div>
                            <p className="font-semibold text-gray-800">
                              {item.menuItem?.name || "Item"}
                            </p>
                            <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Special Notes */}
                {order.notes && (
                  <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-3">
                    <p className="text-sm font-semibold text-yellow-800">Special Instructions:</p>
                    <p className="text-sm text-yellow-700">{order.notes}</p>
                  </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-2">
                  {order.status === "pending" && (
                    <button
                      onClick={() => updateStatus(order._id, "preparing")}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                    >
                      👨‍🍳 Start Preparing
                    </button>
                  )}
                  {order.status === "preparing" && (
                    <button
                      onClick={() => updateStatus(order._id, "completed")}
                      className="flex-1 bg-green-600 hover:bg-green-700 text-white px-4 py-3 rounded-lg font-semibold transition-all"
                    >
                      ✅ Mark Complete
                    </button>
                  )}
                  {order.status === "completed" && (
                    <div className="flex-1 bg-green-100 text-green-700 px-4 py-3 rounded-lg font-semibold text-center">
                      ✅ Completed
                    </div>
                  )}
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
