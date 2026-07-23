export type Category = {
  id: string;
  title: string;
  description: string | null;
  created_at: string;
};

export type CategoriesResponse = Category[];
