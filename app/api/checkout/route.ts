//app/api/checkout
import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { FoodOrder } from "@/lib/models/Order";
import { FoodOrderStatusEnum } from "@/lib/enums/foodOrderStatusEnum";

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const { userId } = await req.json();

    if (!userId) {
      return NextResponse.json({ message: "Missing userId" }, { status: 400 });
    }

    // ✅ Find pending orders (not delivered yet)
    // app/api/checkout/route.ts
    const pendingOrders = await FoodOrder.find({
      user: userId, // not userId, because schema field is 'user'
      status: FoodOrderStatusEnum.PENDING, // ✅ Only PENDING orders
    });

    if (!pendingOrders.length) {
      return NextResponse.json(
        { message: "No pending orders to checkout" },
        { status: 404 }
      );
    }

    // // ✅ Mark as delivered

    await FoodOrder.updateMany(
      { user: userId, status: FoodOrderStatusEnum.PENDING },
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
