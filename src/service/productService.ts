import api from './apiInterceptors';
import Product from '../models/Product.model';

// Lấy danh sách pizza
export const getProducts = async () => {
  try {
    const response = await api.get<Product[]>('/products');
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      data: [],
      message: error.response?.data?.message || 'Không thể lấy danh sách sản phẩm' 
    };
  }
};

// Lấy pizza theo ID
export const getPizzaById = async (id: string) => {
  try {
    const response = await api.get<Product>(`/products/${id}`);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể lấy thông tin sản phẩm' 
    };
  }
};

// Thêm pizza mới
export const addProduct = async (product: Omit<Product, 'id'>) => {
  try {
    const response = await api.post<Product>('/products', product);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể thêm sản phẩm mới' 
    };
  }
};

// Cập nhật pizza
export const updateProduct = async (product: Product) => {
  try {
    const response = await api.put<Product>(`/products/${product.id}`, product);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể cập nhật sản phẩm' 
    };
  }
};

// Xoá pizza
export const deleteProduct = async (id: string) => {
  try {
    await api.delete(`/products/${id}`);
    return { success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể xoá sản phẩm' 
    };
  }
};

// Lấy danh sách pizza theo danh mục
export const getPizzasByCategory = async (categoryId: string) => {
  try {
    const response = await api.get<Product[]>(`/products/category/${categoryId}`);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false,
      data: [], 
      message: error.response?.data?.message || 'Không thể lấy danh sách sản phẩm theo danh mục' 
    };
  }
};

// Tìm kiếm pizza
export const searchPizzas = async (keyword: string) => {
  try {
    const response = await api.get<Product[]>(`/products/search?q=${keyword}`);
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false,
      data: [], 
      message: error.response?.data?.message || 'Không thể tìm kiếm sản phẩm' 
    };
  }
};

// Upload hình ảnh pizza
export const uploadPizzaImage = async (id: string, formData: FormData) => {
  try {
    const response = await api.post(`/products/${id}/image`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    return { data: response.data, success: true };
  } catch (error: any) {
    return { 
      success: false, 
      message: error.response?.data?.message || 'Không thể tải lên hình ảnh sản phẩm' 
    };
  }
};
