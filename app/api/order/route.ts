import { getAllOrders, createOrder } from "@/lib/services/order-service";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  const orders = await getAllOrders();
  return new NextResponse(JSON.stringify({ data: orders }), {
    status: 200,
  });
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  await createOrder(body.newOrder);
  return new NextResponse(JSON.stringify({ message: "Order created" }), {
    status: 200,
  });
}
