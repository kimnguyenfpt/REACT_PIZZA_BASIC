import React from 'react';
import Category from '../models/Category.model';

interface AddCategoryModalProps {
  newCategory: Category;
  onChange: (category: Category) => void;
  onClose: () => void;
  onAdd: (category: Category) => void;
}

const AddCategoryModal: React.FC<AddCategoryModalProps> = ({
  newCategory,
  onChange,
  onClose,
  onAdd,
}) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    
    // Xử lý trường hợp checkbox riêng
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      onChange({ ...newCategory, [name]: checked });
    } else {
      onChange({ ...newCategory, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onAdd(newCategory);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-auto bg-black bg-opacity-50">
      <div className="relative w-full max-w-md p-6 mx-auto bg-white rounded-lg shadow-lg dark:bg-gray-800">
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">Thêm danh mục mới</h3>
          <button
            onClick={onClose}
            className="absolute top-3 right-3 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Tên danh mục
            </label>
            <input
              type="text"
              name="name"
              value={newCategory.name}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
              Mô tả
            </label>
            <textarea
              name="description"
              value={newCategory.description || ''}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              rows={3}
            />
          </div>

          <div className="mb-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="active"
                checked={newCategory.active}
                onChange={handleChange}
                className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:bg-gray-700 dark:border-gray-600"
              />
              <span className="ml-2 text-sm font-medium text-gray-900 dark:text-white">
                Kích hoạt
              </span>
            </label>
          </div>

          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 dark:bg-gray-700 dark:text-white dark:border-gray-600 dark:hover:bg-gray-600"
            >
              Hủy
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Thêm danh mục
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddCategoryModal; 