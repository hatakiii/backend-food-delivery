import { NextRequest, NextResponse } from "next/server";
import {
  getFoodById,
  updateFood,
  deleteFood,
} from "@/lib/services/foodService";

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Food ID is required" },
        { status: 400 }
      );
    }

    const food = await getFoodById(id);

    if (!food) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: food,
    });
  } catch (error) {
    console.error("Error fetching food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch food",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();

    if (!id) {
      return NextResponse.json(
        { error: "Food ID is required" },
        { status: 400 }
      );
    }

    const updatedFood = await updateFood(id, body);

    if (!updatedFood) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Food updated successfully",
      data: updatedFood,
    });
  } catch (error) {
    console.error("Error updating food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to update food",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    if (!id) {
      return NextResponse.json(
        { error: "Food ID is required" },
        { status: 400 }
      );
    }

    const deletedFood = await deleteFood(id);

    if (!deletedFood) {
      return NextResponse.json({ error: "Food not found" }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      message: "Food deleted successfully",
      data: deletedFood,
    });
  } catch (error) {
    console.error("Error deleting food:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to delete food",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
