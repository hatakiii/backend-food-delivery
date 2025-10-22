import { Food } from "../models/Food";
import connectDB from "../mongodb";

import "../models/Category";
import { FoodType } from "../utils/types";

export const getAllFoods = async (): Promise<FoodType[]> => {
  await connectDB();
  const allFoods: FoodType[] = await Food.find({}).populate(
    "categoryId",
    "name"
  );
  return allFoods;
};

export const createFood = async (
  name: string,
  ingredients: string,
  price: number,
  categoryId: string,
  imageUrl: string
) => {
  await connectDB();
  const newFood = new Food({
    name,
    ingredients,
    price,
    categoryId,
    imageUrl,
  });
  const savedFood = await newFood.save();
  return savedFood; // return actual food document
};

// const result = await createFood(...);

// if (result) {
//   return NextResponse.json({ message: "Food item received successfully" }, { status: 200 });
// }
