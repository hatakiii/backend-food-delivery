import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/mongodb";
import { FoodOrder } from "@/lib/models/Order";
import { getAllOrders } from "@/lib/services/order-service";

// Interface for a single item in the incoming request body
interface CartItemRequest {
  foodId: string; // MongoDB ObjectId of the food item
  quantity: number;
}

// Interface for the entire incoming POST request body
interface OrderRequestBody {
  userId: string;
  items: CartItemRequest[];
  totalPrice: number;
}

export async function GET(req: NextRequest) {
  try {
    await connectDB();

    // ✅ Extract userId from query params
    const { searchParams } = new URL(req.url);
    const userId = searchParams.get("userId");

    let orders;

    if (userId) {
      // ✅ Filter orders by userId
      orders = await FoodOrder.find({ user: userId })
        .populate("foodOrderItems.food")
        .lean();
    } else {
      // ✅ Fallback for admin: get all orders
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

// ✅ Add POST method with explicit types
export async function POST(req: NextRequest) {
  try {
    await connectDB();

    // Cast the request body using the defined interface
    const body: OrderRequestBody = await req.json();
    const { userId, items, totalPrice } = body;

    if (!userId || !items?.length) {
      return NextResponse.json(
        { message: "Missing userId or items" },
        { status: 400 }
      );
    }

    // ✅ Create new order document
    const newOrder = new FoodOrder({
      user: userId,
      // Map function uses CartItemRequest type for 'item'
      foodOrderItems: items.map((item: CartItemRequest) => ({
        food: item.foodId, // Assuming foodOrderItems.food is a reference ID
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
