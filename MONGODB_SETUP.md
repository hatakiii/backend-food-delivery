# MongoDB Setup Guide

This guide will help you set up MongoDB with Mongoose in your Next.js food backend project.

## Prerequisites

- Node.js and npm/bun installed
- MongoDB database (local or MongoDB Atlas)

## Environment Variables

Create a `.env.local` file in your project root with the following variables:

```env
# MongoDB Connection
MONGODB_URL=mongodb://localhost:27017/food-backend
# For MongoDB Atlas, use: mongodb+srv://username:password@cluster.mongodb.net/food-backend

# Cloudinary Configuration (if using image uploads)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

## Installation

1. Install dependencies:

```bash
npm install
# or
bun install
```

2. Install tsx for running TypeScript scripts:

```bash
npm install -D tsx
# or
bun add -D tsx
```

## Database Setup

### Option 1: Local MongoDB

1. Install MongoDB locally
2. Start MongoDB service
3. Use connection string: `mongodb://localhost:27017/food-backend`

### Option 2: MongoDB Atlas (Cloud)

1. Create a free account at [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a new cluster
3. Get your connection string and replace the MONGODB_URL in your `.env.local`

## Seeding Sample Data

Run the seeding script to populate your database with sample data:

```bash
npm run seed
# or
bun run seed
```

This will create:

- 5 sample categories (Appetizers, Main Courses, Desserts, Beverages, Salads)
- 6 sample food items with various categories

## API Endpoints

### Food Endpoints

- `GET /api/food` - Get all foods (with filtering options)
- `POST /api/food` - Create a new food item
- `GET /api/food/[id]` - Get a specific food item
- `PUT /api/food/[id]` - Update a food item
- `DELETE /api/food/[id]` - Delete a food item

### Category Endpoints

- `GET /api/categories` - Get all categories
- `POST /api/categories` - Create a new category
- `GET /api/categories/[id]` - Get a specific category
- `PUT /api/categories/[id]` - Update a category
- `DELETE /api/categories/[id]` - Delete a category

## Query Parameters

### Food API Filtering

- `category` - Filter by category name
- `search` - Search in name and description
- `isAvailable` - Filter by availability (true/false)
- `minPrice` - Minimum price filter
- `maxPrice` - Maximum price filter
- `limit` - Number of results to return
- `skip` - Number of results to skip (for pagination)

Example: `GET /api/food?category=Main Courses&minPrice=15&maxPrice=30&limit=10`

### Category API

- `activeOnly` - Show only active categories (default: true)

Example: `GET /api/categories?activeOnly=false`

## Data Models

### Food Model

```typescript
{
  name: string;
  description: string;
  price: number;
  category: string;
  image?: string;
  ingredients: string[];
  isAvailable: boolean;
  rating?: number;
  createdAt: Date;
  updatedAt: Date;
}
```

### Category Model

```typescript
{
  name: string;
  description: string;
  image?: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
```

## Development

Start the development server:

```bash
npm run dev
# or
bun run dev
```

The server will run on `http://localhost:4000`

## Services

The project includes functional services for data operations:

- `foodService` - Handles all food-related database operations
- `categoryService` - Handles all category-related database operations

These services provide functions for CRUD operations, searching, filtering, and more. All functions are exported individually for better tree-shaking and modular imports.

## Error Handling

All API endpoints include proper error handling and return consistent response formats:

```typescript
// Success response
{
  success: true,
  data: any,
  message?: string
}

// Error response
{
  success: false,
  error: string,
  details?: string
}
```

## Next Steps

1. Set up your MongoDB connection
2. Run the seeding script to populate sample data
3. Test the API endpoints
4. Customize the models and services as needed
5. Add authentication and authorization as required
