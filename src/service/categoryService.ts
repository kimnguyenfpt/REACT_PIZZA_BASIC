import api from './apiInterceptors';
import Category from '../models/Category.model';

// Lấy danh sách danh mục
export const getCategories = async () => {
  try {
    const response = await api.get<Category[]>('/categories');
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      data: [],
      message: error.response?.data?.message || 'Không thể lấy danh sách danh mục' 
    };
  }
};

// Thêm danh mục mới
export const addCategory = async (category: Omit<Category, 'id'>) => {
  try {
    const response = await api.post<Category>('/categories', category);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể thêm danh mục mới' 
    };
  }
};

// Cập nhật danh mục
export const updateCategory = async (category: Category) => {
  try {
    const response = await api.put<Category>(`/categories/${category.id}`, category);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể cập nhật danh mục' 
    };
  }
};

// Xoá danh mục
export const deleteCategory = async (id: string) => {
  try {
    await api.delete(`/categories/${id}`);
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể xoá danh mục' 
    };
  }
};

// Lấy chi tiết danh mục
export const getCategoryById = async (id: string) => {
  try {
    const response = await api.get<Category>(`/categories/${id}`);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể lấy thông tin danh mục' 
    };
  }
}; 