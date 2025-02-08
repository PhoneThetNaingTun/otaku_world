import { Category } from "./category";

export type MangaCategory = {
  id: string;
  categoryId: string;
  mangaId: string;
  createdAt: Date;
  updatedAt: Date;
  category: Category;
};

export interface mangaCategorySlice {
  mangaCategories: MangaCategory[];
  mangaCategoryLoading: boolean;
}
