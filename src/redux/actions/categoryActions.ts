import Category from '../../models/Category.model';

export const GET_CATEGORIES = 'GET_CATEGORIES';
export const ADD_CATEGORY = 'ADD_CATEGORY';
export const UPDATE_CATEGORY = 'UPDATE_CATEGORY';
export const REMOVE_CATEGORY = 'REMOVE_CATEGORY';

export const getCategories = (categories: Category[]) => ({
  type: GET_CATEGORIES,
  payload: categories,
});

export const addCategory = (category: Category) => ({
  type: ADD_CATEGORY,
  payload: category,
});

export const updateCategory = (category: Category) => ({
  type: UPDATE_CATEGORY,
  payload: category,
});

export const removeCategory = (id: string) => ({
  type: REMOVE_CATEGORY,
  payload: id,
}); 