export type CreateCategoryDTO = {
  title: string;
  description: string | null;
};

export type UpdateCategoryDTO = {
  title?: string;
  description?: string | null;
};
