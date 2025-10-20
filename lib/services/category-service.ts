import connectDB from "../mongodb";
import { Category } from "../models/Category";
import { Food } from "../models/Food";

export const createCategory = async (name: string) => {
  await connectDB();
  const newCategory = new Category({ name });
  await newCategory.save();
  return newCategory;
};

export const getAllCategories = async () => {
  await connectDB();
  return await Category.find();
};

export const deleteCategoryById = async (id: string) => {
  await connectDB();

  // Check if there are foods using this category
  const foodsWithCategory = await Food.find({ categoryId: id });

  if (foodsWithCategory.length > 0) {
    throw new Error("Cannot delete category: it has related foods");
  }

  // Safe to delete if no related foods
  return await Category.findByIdAndDelete(id);
};
