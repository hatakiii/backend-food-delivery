//app/lib/models/Order.ts
import mongoose, { Schema, Document } from "mongoose";
import { FoodOrderStatusEnum } from "../enums/foodOrderStatusEnum";

interface IFoodOrderItem {
  food: mongoose.Types.ObjectId;
  quantity: number;
}

export interface IFoodOrder extends Document {
  user: mongoose.Types.ObjectId;
  foodOrderItems: IFoodOrderItem[];
  totalPrice: number;
  status: FoodOrderStatusEnum;
  deliveryAddress: string;
  createdAt: Date;
  updatedAt: Date;
}

const FoodOrderItemSchema = new Schema<IFoodOrderItem>({
  food: { type: Schema.Types.ObjectId, ref: "Food", required: true },
  quantity: { type: Number, required: true, min: 1 },
});

const FoodOrderSchema = new Schema<IFoodOrder>(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    foodOrderItems: [FoodOrderItemSchema],
    totalPrice: { type: Number, required: true },
    status: {
      type: String,
      enum: Object.values(FoodOrderStatusEnum),
      default: FoodOrderStatusEnum.PENDING,
    },
    deliveryAddress: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

export const FoodOrder =
  mongoose.models.FoodOrder ||
  mongoose.model<IFoodOrder>("FoodOrder", FoodOrderSchema);
