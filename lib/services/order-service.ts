//order-service.ts
import connectDB from "../mongodb";
import mongoose from "mongoose";
import { FoodOrder } from "../models/Order";
import "../models/Food";
import "../models/User";
import { FoodOrderStatusEnum } from "../enums/foodOrderStatusEnum";

interface OrderInput {
  userId: string;
  items: { foodId: string; quantity: number }[];
  totalPrice: number;
}

export const createOrder = async (orderData: OrderInput) => {
  await connectDB();

  if (!orderData.userId) {
    throw new Error("User ID is required when creating an order");
  }

  const newOrder = new FoodOrder({
    user: new mongoose.Types.ObjectId(orderData.userId),
    foodOrderItems: orderData.items.map((item) => ({
      food: new mongoose.Types.ObjectId(item.foodId),
      quantity: item.quantity,
    })),
    totalPrice: orderData.totalPrice,
    status: FoodOrderStatusEnum.PENDING,
  });

  await newOrder.save();
  return newOrder;
};

/**
 * Get all orders with populated user and food info
 */
export const getAllOrders = async () => {
  await connectDB();
  return await FoodOrder.find()
    .populate("user", "email role")
    .populate("foodOrderItems.food", "name price imageUrl");
};

export const getOrderById = async (id: string) => {
  await connectDB();
  return await FoodOrder.findById(id)
    .populate("user", "email role address phoneNumber")
    .populate("foodOrderItems.food", "name price imageUrl");
};

/**
 * Update order status (e.g., PENDING -> COMPLETED)
 */
export const updateOrderStatus = async (
  id: string,
  status: FoodOrderStatusEnum
) => {
  await connectDB();
  return await FoodOrder.findByIdAndUpdate(id, { status }, { new: true });
};

/**
 * Delete an order by ID
 */
export const deleteOrderById = async (id: string) => {
  await connectDB();
  return await FoodOrder.findByIdAndDelete(id);
};
