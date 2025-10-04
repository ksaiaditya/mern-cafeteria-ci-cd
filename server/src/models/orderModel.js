import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
      {
        menuItem: { type: mongoose.Schema.Types.ObjectId, ref: "Menu", required: true },
        quantity: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["pending", "preparing", "completed"],
      default: "pending",
    },
    totalPrice: { type: Number, required: true },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;
