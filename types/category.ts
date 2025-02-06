export type Category = {
  id: string;
  category_name: string;
  createdAt: Date;
  updatedAt: Date;
};

export interface categorySlice {
  categories: Category[];
  categoryLoading: boolean;
}
