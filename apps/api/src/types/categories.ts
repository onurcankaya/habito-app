export type CreateCategoryDTO = {
  title: string;
  description: string | null;
  color: string;
};

export type UpdateCategoryDTO = {
  title?: string;
  description?: string | null;
  color?: string;
};
