import mongoose, { Schema } from "mongoose";
import { FoodType } from "../utils/types";

const FoodSchema = new Schema({
  name: String,
  price: Number,
  categoryId: Schema.Types.ObjectId,
  ingredients: String,
  imageUrl: String,
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodType>("Food", FoodSchema);
