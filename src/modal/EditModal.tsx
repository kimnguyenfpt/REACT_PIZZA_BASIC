import { XMarkIcon } from '@heroicons/react/24/outline';
import Product from '../models/Product.model';
import { useState, useEffect } from 'react';
import { getCategories } from '../service/categoryService';
import Category from '../models/Category.model';

type Props = {
  product: Product;
  onClose: () => void;
  onSave: (updated: Product) => void;
};

const EditModal = ({ product, onClose, onSave }: Props) => {
  const [editedProduct, setEditedProduct] = useState<Product>({...product});
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        if (res.success) {
          setCategories(res.data);
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh mục:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchCategories();
  }, []);
  
  const handleChange = (key: keyof Product, value: string | number | boolean) => {
    setEditedProduct(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(editedProduct);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl w-[90%] max-w-md space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>
        <h3 className="text-xl font-bold">✏️ Sửa sản phẩm</h3>
        <input
          type="text"
          value={editedProduct.name}
          onChange={e => handleChange('name', e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Tên sản phẩm"
        />
        <input
          type="text"
          value={editedProduct.description}
          onChange={e => handleChange('description', e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Mô tả"
        />
        <input
          type="number"
          value={editedProduct.price}
          onChange={e => handleChange('price', parseInt(e.target.value || '0'))}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Giá"
        />
        <input
          type="text"
          value={editedProduct.image}
          onChange={e => handleChange('image', e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="URL hình ảnh"
        />
        
        <div>
          <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
            Danh mục
          </label>
          <select
            value={editedProduct.categoryId || ''}
            onChange={e => handleChange('categoryId', e.target.value)}
            className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            disabled={loading}
          >
            <option value="">-- Chọn danh mục --</option>
            {loading ? (
              <option disabled>Đang tải danh mục...</option>
            ) : (
              categories.map(category => (
                <option key={category.id} value={category.id}>
                  {category.name}
                </option>
              ))
            )}
          </select>
        </div>

        <div className="flex items-center">
          <input
            type="checkbox"
            id="active"
            checked={editedProduct.active}
            onChange={e => handleChange('active', e.target.checked)}
            className="w-4 h-4 mr-2"
          />
          <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">
            Kích hoạt
          </label>
        </div>
        
        <button
          onClick={handleSave}
          className="w-full py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
        >
          Lưu thay đổi
        </button>
      </div>
    </div>
  );
};

export default EditModal;
