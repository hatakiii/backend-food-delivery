import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { FoodOrder } from "@/lib/models/Order";
import { getAllOrders } from "@/lib/services/order-service";

interface CartItemRequest {
  foodId: string;
  quantity: number;
}

interface OrderRequestBody {
  userId: string;
  items: CartItemRequest[];
  totalPrice: number;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let orders;

    if (userId) {
      orders = await FoodOrder.find({ user: userId })
        .populate("foodOrderItems.food")
        .lean();
    } else {
      orders = await getAllOrders();
    }

    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (err) {
    console.error("Error fetching orders:", err);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDB();
    const body: OrderRequestBody = await req.json();
    const { userId, items, totalPrice } = body;

    if (!userId || !items?.length) {
      return NextResponse.json(
        { message: "Missing userId or items" },
        { status: 400 }
      );
    }

    const newOrder = new FoodOrder({
      user: userId,
      foodOrderItems: items.map((item: CartItemRequest) => ({
        food: item.foodId,
        quantity: item.quantity,
      })),
      totalPrice,
      status: "PENDING",
    });

    await newOrder.save();

    return NextResponse.json(
      { message: "Order created", order: newOrder },
      { status: 201 }
    );
  } catch (err) {
    console.error("Error creating order:", err);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
