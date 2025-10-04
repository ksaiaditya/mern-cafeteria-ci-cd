import { useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function Checkout() {
  const { cart, clearCart, getCartTotal } = useCart();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [customerName, setCustomerName] = useState("");
  const [notes, setNotes] = useState("");

  const handleOrder = async () => {
    if (!customerName.trim()) {
      alert("Please enter your name");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem("token");
      
      // Transform cart items to backend format: {menuItem: id, quantity: number}
      const orderItems = cart.map((item) => ({
        menuItem: item._id,
        quantity: item.quantity,
      }));

      const { data } = await API.post(
        "/orders",
        { 
          items: orderItems,
          customerName,
          notes 
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      
      alert("🎉 Order placed successfully! Your order number is: " + data._id);
      clearCart();
      navigate("/my-orders");
    } catch (err) {
      console.error("Order failed", err);
      alert("❌ Failed to place order: " + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
        <div className="text-center">
          <span className="text-8xl mb-4 block">📦</span>
          <h2 className="text-3xl font-bold text-gray-800 mb-2">No items to checkout</h2>
          <p className="text-gray-600 mb-6">Add items to your cart first!</p>
          <button
            onClick={() => navigate("/menu")}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-all"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2">💳 Checkout</h1>
        <p className="text-purple-100">Complete your order</p>
      </div>

      <div className="container mx-auto p-6 max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Order Details */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Customer Details</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Your Name *
                </label>
                <input
                  type="text"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter your name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Special Instructions (Optional)
                </label>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Any special requests?"
                  rows="3"
                />
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-xl shadow-md p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Order Summary</h2>
            
            <div className="space-y-3 mb-4">
              {cart.map((item) => (
                <div key={item._id} className="flex justify-between items-start border-b pb-2">
                  <div className="flex-1">
                    <p className="font-semibold text-gray-800">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity} × ₹{item.price}</p>
                  </div>
                  <p className="font-bold text-gray-800">₹{(item.price * item.quantity).toFixed(2)}</p>
                </div>
              ))}
            </div>

            <div className="border-t-2 border-gray-300 pt-4 mb-6">
              <div className="flex justify-between text-xl font-bold">
                <span>Total Amount</span>
                <span className="text-green-600">₹{getCartTotal().toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleOrder}
              disabled={loading}
              className="w-full bg-green-600 hover:bg-green-700 text-white py-3 rounded-lg font-bold text-lg transition-all shadow-lg disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : "Confirm Order"}
            </button>

            <button
              onClick={() => navigate("/cart")}
              className="w-full mt-3 bg-gray-200 hover:bg-gray-300 text-gray-800 py-2 rounded-lg font-semibold transition-all"
            >
              Back to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
