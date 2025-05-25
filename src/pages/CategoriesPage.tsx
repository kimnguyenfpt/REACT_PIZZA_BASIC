import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
// import { getCategories as getCategoriesAction } from '../redux/actions/categoryActions';
import { getCategories } from '../service/categoryService';
import Category from '../models/Category.model';

const CategoriesPage = () => {
  const dispatch = useDispatch();
  const categories = useSelector((state: RootState) => state.category.categories);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const res = await getCategories();
        // dispatch(getCategoriesAction(res.data));
      } catch (err) {
        console.error('❌ Lỗi khi gọi API danh mục:', err);
      }
    };
    fetchCategories();
  }, [dispatch]);

  return (
    <div className="min-h-[calc(100vh-200px)] p-4 sm:p-6 lg:p-10 overflow-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white">Danh mục sản phẩm</h1>
      
      {categories.length === 0 ? (
        <div className="text-center py-10 text-gray-500 dark:text-gray-400">
          Không có danh mục nào
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.filter((cat: Category) => cat.active).map((category: Category) => (
            <div 
              key={category.id} 
              className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700"
            >
              <h2 className="text-xl font-semibold mb-2 text-gray-800 dark:text-white">
                {category.name}
              </h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                {category.description || 'Không có mô tả'}
              </p>
              <div className="flex justify-between items-center">
                <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                  category.active
                    ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300'
                    : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300'
                }`}>
                  {category.active ? 'Hoạt động' : 'Không hoạt động'}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoriesPage; 