import { NextRequest, NextResponse } from "next/server";
import { uploadImageToCloudinary } from "@/lib/utils/uploadImage";
import { FoodType } from "@/lib/utils/types";
import {
  getAllFoods,
  getFoodCount,
  createFood,
} from "@/lib/services/foodService";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");
    const isAvailable = searchParams.get("isAvailable");
    const minPrice = searchParams.get("minPrice");
    const maxPrice = searchParams.get("maxPrice");
    const limit = searchParams.get("limit");
    const skip = searchParams.get("skip");

    const filters = {
      ...(category && { category }),
      ...(search && { search }),
      ...(isAvailable !== null && { isAvailable: isAvailable === "true" }),
      ...(minPrice && { minPrice: parseFloat(minPrice) }),
      ...(maxPrice && { maxPrice: parseFloat(maxPrice) }),
      ...(limit && { limit: parseInt(limit) }),
      ...(skip && { skip: parseInt(skip) }),
    };

    const foods = await getAllFoods(filters);
    const totalCount = await getFoodCount(filters);

    return NextResponse.json({
      success: true,
      data: foods,
      total: totalCount,
      filters,
    });
  } catch (error) {
    console.error("Error fetching foods:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to fetch foods",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    // Parse the formData from the request
    const formData = await request.formData();

    // Extract food fields from formData
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const ingredients = formData.get("ingredients") as string;
    const price = formData.get("price") as string;
    const category = formData.get("category") as string;
    const image = formData.get("image") as File;
    const isAvailable = formData.get("isAvailable") as string;
    const rating = formData.get("rating") as string;

    // Console log the received data
    console.log("========== Received Food Data ==========");
    console.log("Name:", name);
    console.log("Description:", description);
    console.log("Ingredients:", ingredients);
    console.log("Price:", price);
    console.log("Category:", category);
    console.log("Is Available:", isAvailable);
    console.log("Rating:", rating);
    console.log(
      "Image:",
      image ? `${image.name} (${image.size} bytes)` : "No image"
    );
    console.log("=======================================");

    // Validate required fields
    if (!name || !description || !price || !category) {
      return NextResponse.json(
        {
          error:
            "Missing required fields: name, description, price, and category are required",
        },
        { status: 400 }
      );
    }

    // Handle image upload if image exists
    let imageUrl = "";
    if (image) {
      imageUrl = await uploadImageToCloudinary(image);
    }

    // Parse ingredients array (assuming it's comma-separated)
    const ingredientsArray = ingredients
      ? ingredients.split(",").map((ing) => ing.trim())
      : [];

    // Prepare the food data object for MongoDB
    const foodData = {
      name,
      description,
      price: parseFloat(price),
      category,
      image: imageUrl,
      ingredients: ingredientsArray,
      isAvailable: isAvailable ? isAvailable === "true" : true,
      rating: rating ? parseFloat(rating) : undefined,
    };

    console.log("Final Food Data:", foodData);

    // Save to MongoDB
    const savedFood = await createFood(foodData);

    // Return success response
    return NextResponse.json(
      {
        success: true,
        message: "Food item created successfully",
        data: savedFood,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Error processing food data:", error);
    return NextResponse.json(
      {
        success: false,
        error: "Failed to process food data",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
