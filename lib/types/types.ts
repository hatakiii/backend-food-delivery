export type FoodType = {
  _id?: string;
  name: string;
  price: number;
  ingredients: string;
  imageUrl: string;
  categoryId: string;
};

export type CategoryType = {
  _id: string;
  name: string;
  createdAt?: string;
  updatedAt?: string;
};
