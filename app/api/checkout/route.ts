import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";
import connectDB from "@/lib/mongodb";
import { FoodOrder } from "@/lib/models/Order";
import { FoodOrderStatusEnum } from "@/lib/enums/foodOrderStatusEnum";

export async function POST(req: NextRequest) {
  try {
    await connectDB();

    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json(
        { message: "Invalid or empty JSON body" },
        { status: 400 }
      );
    }

    const { userId } = body;
    console.log("🧾 Checkout request body:", body);

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    const pendingOrders = await FoodOrder.find({
      user: new mongoose.Types.ObjectId(userId),
      status: FoodOrderStatusEnum.PENDING,
    });

    if (!pendingOrders.length) {
      return NextResponse.json(
        { message: "No pending orders to checkout" },
        { status: 404 }
      );
    }

    await FoodOrder.updateMany(
      {
        user: new mongoose.Types.ObjectId(userId),
        status: FoodOrderStatusEnum.PENDING,
      },
      { $set: { status: FoodOrderStatusEnum.DELIVERED } }
    );

    return NextResponse.json({
      message: "Checkout successful",
      completedOrders: pendingOrders.length,
    });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { message: "Checkout failed", error: (error as Error).message },
      { status: 500 }
    );
  }
}
