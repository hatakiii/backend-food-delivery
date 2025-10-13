import { FoodType } from "../utils/types";
import connectDB from "../mongodb";
import { Food } from "../models/Food";

export const createFood = async (foodData: FoodType) => {
  await connectDB();
  const newFood = new Food({ foodData });
  await newFood.save();
  return newFood;
};

export const getAllFoods = async () => {
  await connectDB();
  return await Food.find();
};
