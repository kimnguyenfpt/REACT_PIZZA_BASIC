import axios from 'axios';
import Category from '../models/Category.model';

const BASE_URL = 'https://68075345e81df7060eb9b8af.mockapi.io/categories';

export const getCategories = () => axios.get<Category[]>(BASE_URL);
export const addCategory = (category: Omit<Category, 'id'>) => axios.post(BASE_URL, category);
export const updateCategory = (category: Category) => axios.put(`${BASE_URL}/${category.id}`, category);
export const deleteCategory = (id: string) => axios.delete(`${BASE_URL}/${id}`); 