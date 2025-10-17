import mongoose, { Schema } from "mongoose";
import { FoodType } from "../utils/types";

const FoodSchema = new Schema(
  {
    name: String,
    price: { type: Number, required: true },
    categoryId: { type: mongoose.Schema.Types.ObjectId, ref: "Category" },
    ingredients: String,
    imageUrl: String,
  },
  { timestamps: true }
);

export const Food =
  mongoose.models.Food || mongoose.model<FoodType>("Food", FoodSchema);
