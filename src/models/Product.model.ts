import Category from './Category.model';

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  categoryId: string;
  category?: Category;
  active: boolean;
  createdAt: string;
  updatedAt: string;
}

export default Product; 