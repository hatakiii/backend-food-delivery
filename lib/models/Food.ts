import mongoose, { Schema } from "mongoose";
import { FoodType } from "../utils/types";
import { Category } from "./Category";

// const FoodSchema = new Schema({
//   name: String,
//   price: Number,
//   categoryId: Schema.Types.ObjectId,
//   ingredients: String,
//   imageUrl: String,
// });

const FoodSchema = new Schema(
  {
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true },
    ingredients: { type: String, required: true },
    categoryId: {
      type: Schema.ObjectId,
      ref: "Category",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Food =
  mongoose.models.Food || mongoose.model<FoodType>("Food", FoodSchema);
