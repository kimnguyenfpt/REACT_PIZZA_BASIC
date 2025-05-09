import { useEffect, useState } from 'react';
import Category from '../models/Category.model';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import EditCategoryModal from '../modal/EditCategoryModal';
import AddCategoryModal from '../modal/AddCategoryModal';
import { useDispatch } from 'react-redux';

import { addCategory, updateCategory, removeCategory } from '../redux/actions/categoryActions';
import { addCategory as addCategoryAPI, getCategories, deleteCategory as deleteCategoryAPI, updateCategory as updateCategoryAPI } from '../service/categoryService';
import DeleteModal from '../modal/DeleteModal';
import { v4 as uuidv4 } from 'uuid';

const ManageCategoriesPage = () => {
  const dispatch = useDispatch();

  const [categories, setCategories] = useState<Category[]>([]);
  const [editing, setEditing] = useState<Category | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<Category | null>(null);
  const [newCategory, setNewCategory] = useState<Category>({
    id: '',
    name: '',
    description: '',
    active: true
  });
  const [isLoading, setIsLoading] = useState(false);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      const res = await getCategories();
      setCategories(res.data);
    } catch (err) {
      console.error('❌ Lỗi khi gọi API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleting) {
      try {
        await deleteCategoryAPI(deleting.id);
        dispatch(removeCategory(deleting.id));
        console.log('🗑️ Đã xoá danh mục:', deleting);
        setDeleting(null);
        fetchCategories();
      } catch (error) {
        console.error('❌ Lỗi khi xóa danh mục:', error);
      }
    }
  };

  const handleUpdate = async (category: Category) => {
    try {
      const res = await updateCategoryAPI(category);
      dispatch(updateCategory(res.data));
      console.log('✅ Cập nhật danh mục thành công:', res.data);
      setEditing(null);
      fetchCategories();
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật danh mục:', error);
    }
  };

  const handleAdd = async (category: Category) => {
    try {
      const categoryWithId = { ...category, id: uuidv4() };
      const res = await addCategoryAPI(categoryWithId);
      dispatch(addCategory(res.data));
      console.log('✅ Thêm danh mục thành công:', res.data);
      setAdding(false);
      fetchCategories();
    } catch (error) {
      console.error('❌ Lỗi khi thêm danh mục:', error);
    }
  };

  return (
    <div className="p-6 text-[#14274e] dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📑 Danh sách danh mục</h2>
        <button
          onClick={() => {
            setNewCategory({
              id: '',
              name: '',
              description: '',
              active: true
            });
            setAdding(true);
          }}
          className="bg-[#5d3fd3] hover:bg-[#4a2fc2] text-white font-semibold px-4 py-2 rounded"
        >
          + Thêm danh mục
        </button>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-10">
          <div className="animate-spin rounded-full h-10 w-10 border-t-2 border-b-2 border-[#5d3fd3]"></div>
        </div>
      ) : (
        <div className="overflow-x-auto border border-gray-200 rounded-lg shadow dark:border-gray-700">
          <table className="min-w-full text-sm text-left">
            <thead className="bg-[#6d4aff] text-white">
              <tr>
                <th className="px-4 py-3">STT</th>
                <th className="px-4 py-3">Tên danh mục</th>
                <th className="px-4 py-3">Mô tả</th>
                <th className="px-4 py-3">Trạng thái</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {categories.length > 0 ? (
                categories.map((category, index) => (
                  <tr
                    key={category.id}
                    className={`${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-[#f7f3ff] dark:bg-[#2a2a2a]'
                    } border-b dark:border-gray-700`}
                  >
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3">{category.name}</td>
                    <td className="px-4 py-3">{category.description}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          category.active
                            ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                            : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                        }`}
                      >
                        {category.active ? 'Hoạt động' : 'Không hoạt động'}
                      </span>
                    </td>
                    <td className="flex justify-center gap-2 px-4 py-3">
                      <button
                        onClick={() => setEditing(category)}
                        className="flex items-center gap-1 px-3 py-1 text-white bg-purple-600 rounded hover:bg-purple-700"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(category)}
                        className="flex items-center gap-1 px-3 py-1 text-white bg-red-600 rounded hover:bg-red-700"
                      >
                        <TrashIcon className="w-4 h-4" />
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-4 py-10 text-center">
                    Không có danh mục nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {adding && (
        <AddCategoryModal
          newCategory={newCategory}
          onChange={setNewCategory}
          onClose={() => setAdding(false)}
          onAdd={handleAdd}
        />
      )}

      {editing && (
        <EditCategoryModal
          category={editing}
          onSave={handleUpdate}
          onClose={() => setEditing(null)}
        />
      )}

      {deleting && (
        <DeleteModal
          name={deleting.name}
          onClose={() => setDeleting(null)}
          onConfirm={handleDeleteConfirm}
        />
      )}
    </div>
  );
};

export default ManageCategoriesPage; 