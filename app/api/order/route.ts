//app/api/order/route.ts
import { NextRequest, NextResponse } from "next/server";
import { createOrder, getAllOrders } from "@/lib/services/order-service";

export async function GET() {
  try {
    const orders = await getAllOrders();
    return NextResponse.json({ data: orders }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to fetch orders" },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    const order = await createOrder(body);
    return NextResponse.json(
      { message: "Order created", order },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to create order" },
      { status: 500 }
    );
  }
}
