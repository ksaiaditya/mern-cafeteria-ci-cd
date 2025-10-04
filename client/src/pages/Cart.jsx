import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function Cart() {
  const { cart, removeFromCart } = useCart();
  const navigate = useNavigate();

  if (cart.length === 0) {
    return <p className="p-6">Your cart is empty</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold mb-4">Your Cart</h2>
      <ul>
        {cart.map((item) => (
          <li
            key={item._id}
            className="flex justify-between items-center border-b py-2"
          >
            <span>
              {item.name} - ${item.price}
            </span>
            <button
              onClick={() => removeFromCart(item._id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>

      <button
        onClick={() => navigate("/checkout")}
        className="mt-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        Proceed to Checkout
      </button>
    </div>
  );
}
