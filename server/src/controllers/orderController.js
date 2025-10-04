import Order from "../models/orderModel.js";
import Menu from "../models/menuModel.js";

// Place new order (Customer)
export const placeOrder = async (req, res) => {
  try {
    const { items } = req.body;

    // Calculate total price
    let totalPrice = 0;
    for (const item of items) {
      const menuItem = await Menu.findById(item.menuItem);
      if (!menuItem) throw new Error("Menu item not found");
      totalPrice += menuItem.price * item.quantity;
    }

    const order = new Order({
      customer: req.user._id,
      items,
      totalPrice,
    });

    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all orders (Kitchen/Admin only)
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("customer", "name email")
      .populate("items.menuItem", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Update order status (Kitchen/Admin only)
export const updateOrderStatus = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = req.body.status || order.status;
    await order.save();

    res.json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get my orders (Customer only)
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ customer: req.user._id })
      .populate("items.menuItem", "name price");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
