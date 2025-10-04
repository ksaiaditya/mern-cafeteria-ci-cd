import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [menu, setMenu] = useState([]);
  const [orders, setOrders] = useState([]);
  const [activeTab, setActiveTab] = useState("menu");
  const [newItem, setNewItem] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
    imageUrl: "",
    available: true,
  });
  const [editingItem, setEditingItem] = useState(null);

  const fetchMenu = async () => {
    try {
      const { data } = await API.get("/menu");
      setMenu(data);
    } catch (err) {
      console.error("Failed to fetch menu:", err);
    }
  };

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
    fetchMenu();
    fetchOrders();
  }, []);

  const addMenuItem = async () => {
    if (!newItem.name || !newItem.price) {
      alert("Name and price are required!");
      return;
    }

    try {
      await API.post("/menu", newItem);
      setNewItem({
        name: "",
        description: "",
        price: "",
        category: "",
        imageUrl: "",
        available: true,
      });
      fetchMenu();
      alert("✅ Item added successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add item");
    }
  };

  const updateMenuItem = async (id) => {
    try {
      await API.put(`/menu/${id}`, editingItem);
      setEditingItem(null);
      fetchMenu();
      alert("✅ Item updated successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to update item");
    }
  };

  const deleteMenuItem = async (id) => {
    if (!confirm("Are you sure you want to delete this item?")) return;

    try {
      await API.delete(`/menu/${id}`);
      fetchMenu();
      alert("✅ Item deleted successfully!");
    } catch (err) {
      console.error(err);
      alert("❌ Failed to delete item");
    }
  };

  const toggleAvailability = async (item) => {
    try {
      await API.put(`/menu/${item._id}`, { available: !item.available });
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to toggle availability");
    }
  };

  // Calculate analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.totalPrice, 0);
  const completedOrders = orders.filter((o) => o.status === "completed").length;
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">📊 Admin Dashboard</h1>
        <p className="text-purple-100">Manage your cafeteria</p>
      </div>

      <div className="container mx-auto p-6">
        {/* Analytics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Revenue</p>
            <p className="text-3xl font-bold text-green-600">₹{totalRevenue.toFixed(2)}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Total Orders</p>
            <p className="text-3xl font-bold text-blue-600">{orders.length}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-3xl font-bold text-green-600">{completedOrders}</p>
          </div>
          <div className="bg-white rounded-xl shadow-md p-6">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-3xl font-bold text-yellow-600">{pendingOrders}</p>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-4 mb-6">
          <button
            onClick={() => setActiveTab("menu")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "menu"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            🍽️ Menu Management
          </button>
          <button
            onClick={() => setActiveTab("orders")}
            className={`px-6 py-3 rounded-lg font-semibold transition-all ${
              activeTab === "orders"
                ? "bg-purple-600 text-white shadow-lg"
                : "bg-white text-gray-700 hover:bg-gray-100"
            }`}
          >
            📦 Orders Overview
          </button>
        </div>

        {/* Menu Management Tab */}
        {activeTab === "menu" && (
          <>
            {/* Add New Item Form */}
            <div className="mb-6 bg-white shadow-md p-6 rounded-xl">
              <h2 className="text-2xl font-bold mb-4">➕ Add New Menu Item</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Item Name *"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="number"
                  placeholder="Price *"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Category (e.g., Drinks, Snacks)"
                  value={newItem.category}
                  onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  placeholder="Image URL (optional)"
                  value={newItem.imageUrl}
                  onChange={(e) => setNewItem({ ...newItem, imageUrl: e.target.value })}
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  placeholder="Description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  className="border p-3 rounded-lg focus:ring-2 focus:ring-purple-500 md:col-span-2"
                  rows="2"
                />
              </div>
              <button
                onClick={addMenuItem}
                className="mt-4 bg-purple-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-700 transition-all"
              >
                Add Item
              </button>
            </div>

            {/* Menu Items Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {menu.map((item) => (
                <div
                  key={item._id}
                  className={`bg-white shadow-md rounded-xl p-4 ${
                    !item.available ? "opacity-60" : ""
                  }`}
                >
                  {editingItem?._id === item._id ? (
                    // Edit Mode
                    <div className="space-y-2">
                      <input
                        type="text"
                        value={editingItem.name}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, name: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="number"
                        value={editingItem.price}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, price: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <input
                        type="text"
                        value={editingItem.category}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, category: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                      />
                      <textarea
                        value={editingItem.description}
                        onChange={(e) =>
                          setEditingItem({ ...editingItem, description: e.target.value })
                        }
                        className="w-full border p-2 rounded"
                        rows="2"
                      />
                      <div className="flex gap-2">
                        <button
                          onClick={() => updateMenuItem(item._id)}
                          className="flex-1 bg-green-600 text-white px-3 py-2 rounded hover:bg-green-700"
                        >
                          Save
                        </button>
                        <button
                          onClick={() => setEditingItem(null)}
                          className="flex-1 bg-gray-500 text-white px-3 py-2 rounded hover:bg-gray-600"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
                      {item.description && (
                        <p className="text-sm text-gray-600 mb-2">{item.description}</p>
                      )}
                      <p className="text-green-600 font-bold text-xl mb-2">₹{item.price}</p>
                      {item.category && (
                        <span className="inline-block text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded mb-3">
                          {item.category}
                        </span>
                      )}
                      <div className="flex gap-2 mt-3">
                        <button
                          onClick={() => toggleAvailability(item)}
                          className={`flex-1 px-3 py-2 rounded font-semibold ${
                            item.available
                              ? "bg-green-100 text-green-700 hover:bg-green-200"
                              : "bg-red-100 text-red-700 hover:bg-red-200"
                          }`}
                        >
                          {item.available ? "Available" : "Unavailable"}
                        </button>
                        <button
                          onClick={() => setEditingItem(item)}
                          className="bg-blue-600 text-white px-3 py-2 rounded hover:bg-blue-700"
                        >
                          ✏️
                        </button>
                        <button
                          onClick={() => deleteMenuItem(item._id)}
                          className="bg-red-600 text-white px-3 py-2 rounded hover:bg-red-700"
                        >
                          🗑️
                        </button>
                      </div>
                    </>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Orders Overview Tab */}
        {activeTab === "orders" && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div key={order._id} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <p className="text-sm text-gray-600">Order ID</p>
                    <p className="font-mono font-semibold">#{order._id.slice(-8)}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      Customer: {order.user?.name || "N/A"}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">Total</p>
                    <p className="text-2xl font-bold text-green-600">
                      ₹{order.totalPrice.toFixed(2)}
                    </p>
                    <span
                      className={`inline-block mt-2 px-3 py-1 rounded-full text-sm font-semibold ${
                        order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : order.status === "preparing"
                          ? "bg-blue-100 text-blue-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Items: {order.items.length}</p>
                  <p>Date: {new Date(order.createdAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
