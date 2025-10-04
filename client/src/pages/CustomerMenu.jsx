import { useEffect, useState } from "react";
import API from "../api/axios";
import { useCart } from "../context/CartProvider";
import { useNavigate } from "react-router-dom";

export default function CustomerMenu() {
  const [menu, setMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [categories, setCategories] = useState(["All"]);
  const { addToCart, getCartCount } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const { data } = await API.get("/menu");
        setMenu(data);
        
        const uniqueCategories = ["All", ...new Set(data.map(item => item.category).filter(Boolean))];
        setCategories(uniqueCategories);
      } catch (err) {
        console.error("Failed to fetch menu:", err);
      }
    };
    fetchMenu();
  }, []);

  const handleAddToCart = (item) => {
    if (!item.available) {
      alert("This item is currently unavailable");
      return;
    }
    addToCart(item);
  };

  const filteredMenu = selectedCategory === "All" 
    ? menu 
    : menu.filter(item => item.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white p-6 shadow-lg">
        <h1 className="text-3xl font-bold mb-2"> Digital Menu</h1>
        <p className="text-blue-100">Scan  Browse  Order</p>
      </div>

      <div className="container mx-auto p-6">
        <div className="mb-6 flex gap-2 overflow-x-auto pb-2">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={"px-4 py-2 rounded-full whitespace-nowrap transition-all " + (
                selectedCategory === category
                  ? "bg-blue-600 text-white shadow-lg scale-105"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              )}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredMenu.map((item) => (
            <div 
              key={item._id} 
              className={"bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow " + (
                !item.available ? "opacity-60" : ""
              )}
            >
              {item.imageUrl ? (
                <img 
                  src={item.imageUrl} 
                  alt={item.name}
                  className="w-full h-48 object-cover"
                />
              ) : (
                <div className="w-full h-48 bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center">
                  <span className="text-6xl"></span>
                </div>
              )}

              <div className="p-4">
                <div className="flex justify-between items-start mb-2">
                  <h2 className="text-xl font-bold text-gray-800">{item.name}</h2>
                  {!item.available && (
                    <span className="text-xs bg-red-100 text-red-600 px-2 py-1 rounded">
                      Unavailable
                    </span>
                  )}
                </div>
                
                {item.description && (
                  <p className="text-gray-600 text-sm mb-3">{item.description}</p>
                )}
                
                {item.category && (
                  <span className="inline-block text-xs bg-blue-50 text-blue-600 px-2 py-1 rounded mb-3">
                    {item.category}
                  </span>
                )}

                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-green-600">
                    {item.price}
                  </span>
                  <button
                    onClick={() => handleAddToCart(item)}
                    disabled={!item.available}
                    className={"px-4 py-2 rounded-lg font-semibold transition-all " + (
                      item.available
                        ? "bg-blue-600 text-white hover:bg-blue-700 active:scale-95"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    )}
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {getCartCount() > 0 && (
          <button
            onClick={() => navigate("/cart")}
            className="fixed bottom-6 right-6 bg-green-600 text-white px-6 py-3 rounded-full shadow-2xl hover:bg-green-700 transition-all flex items-center gap-2 animate-bounce"
          >
            <span className="text-xl"></span>
            <span className="font-bold">Cart ({getCartCount()})</span>
          </button>
        )}
      </div>
    </div>
  );
}
