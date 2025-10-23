import { FoodOrder } from "../models/Order";
import connectDB from "../mongodb";

export const createOrder = async (name: string) => {
  await connectDB();
  const newOrder = new FoodOrder({ name });
  await newOrder.save();
  return newOrder;
};

export const getAllOrders = async () => {
  await connectDB();
  return await FoodOrder.find();
};
