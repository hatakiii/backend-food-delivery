import mongoose, { Schema } from "mongoose";

type FoodSchemaType = {
  name: string;
  price: number;
  ingredients: string;
  category: string;
  image: File;
};

const FoodSchema = new Schema({
  name: { type: String },
  price: { type: Number },
  ingredients: { type: String },
  category: { type: String },
  image: { type: String },
});

export const Food =
  mongoose.models.Food || mongoose.model<FoodSchemaType>("Food", FoodSchema);
