import { useEffect, useState } from "react";
import API from "../api/axios";

export default function Admin() {
  const [menu, setMenu] = useState([]);
  const [newItem, setNewItem] = useState({ name: "", price: "", category: "" });

  const fetchMenu = async () => {
    const { data } = await API.get("/menu");
    setMenu(data);
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const addMenuItem = async () => {
    try {
      await API.post("/menu", newItem);
      setNewItem({ name: "", price: "", category: "" });
      fetchMenu();
    } catch (err) {
      console.error(err);
      alert("❌ Failed to add item");
    }
  };

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold mb-4">📊 Admin Dashboard</h1>

      {/* Add Menu Item */}
      <div className="mb-6 bg-white shadow-md p-4 rounded-xl">
        <h2 className="text-xl font-semibold mb-2">Add New Item</h2>
        <input
          type="text"
          placeholder="Name"
          value={newItem.name}
          onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="number"
          placeholder="Price"
          value={newItem.price}
          onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <input
          type="text"
          placeholder="Category"
          value={newItem.category}
          onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
          className="border p-2 rounded mr-2"
        />
        <button
          onClick={addMenuItem}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
        >
          Add
        </button>
      </div>

      {/* Menu Items */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {menu.map((item) => (
          <div key={item._id} className="bg-white shadow-md rounded-xl p-4">
            <h2 className="text-lg font-semibold">{item.name}</h2>
            <p>₹{item.price} - {item.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
