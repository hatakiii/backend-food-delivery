//app/api/order/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import {
  getOrderById,
  updateOrderStatus,
  deleteOrderById,
} from "@/lib/services/order-service";
import { FoodOrderStatusEnum } from "@/lib/enums/foodOrderStatusEnum";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const order = await getOrderById(id);
    if (!order)
      return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ data: order }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error fetching order" },
      { status: 500 }
    );
  }
}

export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    const { status } = await req.json();
    const order = await updateOrderStatus(id, status as FoodOrderStatusEnum);
    return NextResponse.json(
      { message: "Order updated", order },
      { status: 200 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Error updating order" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  try {
    await deleteOrderById(id);
    return NextResponse.json({ message: "Order deleted" }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json(
      { message: "Failed to delete order" },
      { status: 500 }
    );
  }
}
