import { useEffect, useState } from 'react';
import Pizza from '../models/Pizzza.model';
import { PencilSquareIcon, TrashIcon } from '@heroicons/react/24/solid';
import EditModal from '../modal/EditModal';
import AddModal from '../modal/AddModal';
import { useDispatch } from 'react-redux';

import { addPizza, updatePizza, removePizza } from '../redux/actions/productActions';
import { addPizza as addPizzaAPI, getPizzas, deletePizza as deletePizzaAPI } from '../service/productService';
import { updatePizza as updatePizzaAPI } from '../service/productService';
import DeleteModal from '../modal/DeleteModal';

const ManageProductsPage = () => {
  
  const dispatch = useDispatch();

  const[pizzas, setPizzas]  = useState<Pizza[]>([]);
  const [editing, setEditing] = useState<Pizza | null>(null);
  const [adding, setAdding] = useState(false);
  const [deleting, setDeleting] = useState<Pizza | null>(null);
  const [newPizza, setNewPizza] = useState<Pizza>({ id: 0, name: '', desc: '', img: '', price: 0 });
  const [isLoading, setIsLoading] = useState(false);

  const fetchPizzas = async () => {
    try {
      setIsLoading(true);
      const res = await getPizzas();
      setPizzas(res.data);
    } catch (err) {
      console.error('❌ Lỗi khi gọi API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchPizzas();
  }, []);

  const handleDeleteConfirm = async () => {
    if (deleting) {
      try {
        await deletePizzaAPI(deleting.id);
        dispatch(removePizza(deleting.id));
        console.log('🗑️ Đã xoá sản phẩm:', deleting);
        setDeleting(null);
        // Lấy lại danh sách sau khi xóa
        fetchPizzas();
      } catch (error) {
        console.error('❌ Lỗi khi xóa sản phẩm:', error);
      }
    }
  };
  
  const handleUpdate = async (pizza: Pizza) => {
    try {
      const res = await updatePizzaAPI(pizza); // Gọi API PUT
      dispatch(updatePizza(res.data)); // Dispatch để cập nhật Redux
      console.log('✅ Cập nhật sản phẩm thành công:', res.data);
      setEditing(null);
      // Lấy lại danh sách sau khi cập nhật
      fetchPizzas();
    } catch (error) {
      console.error('❌ Lỗi khi cập nhật sản phẩm:', error);
    }
  };

  const handleAdd = async (pizza: Pizza) => {
    try {
      const res = await addPizzaAPI(pizza); // Gọi API POST
      dispatch(addPizza(res.data)); // Dispatch để cập nhật Redux
      console.log('✅ Thêm sản phẩm thành công:', res.data);
      setAdding(false);
      // Lấy lại danh sách sau khi thêm
      fetchPizzas();
    } catch (error) {
      console.error('❌ Lỗi khi thêm sản phẩm:', error);
    }
  };
  

  return (
    <div className="p-6 text-[#14274e] dark:text-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">📦 Danh sách sản phẩm</h2>
        <button
          onClick={() => setAdding(true)}
          className="bg-[#5d3fd3] hover:bg-[#4a2fc2] text-white font-semibold px-4 py-2 rounded"
        >
          + Thêm sản phẩm
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
                <th className="px-4 py-3">Tên</th>
                <th className="px-4 py-3">Mô tả</th>
                <th className="px-4 py-3">Giá</th>
                <th className="px-4 py-3 text-center">Hành động</th>
              </tr>
            </thead>
            <tbody>
              {pizzas.length > 0 ? (
                pizzas.map((pizza, index) => (
                  <tr
                    key={pizza.id}
                    className={`${
                      index % 2 === 0
                        ? 'bg-white dark:bg-gray-800'
                        : 'bg-[#f7f3ff] dark:bg-[#2a2a2a]'
                    } border-b dark:border-gray-700`}
                  >
                    <td className="px-4 py-3 font-semibold">{index + 1}</td>
                    <td className="px-4 py-3">{pizza.name}</td>
                    <td className="px-4 py-3">{pizza.desc}</td>
                    <td className="px-4 py-3 font-bold text-red-500">{pizza.price.toLocaleString()}₫</td>
                    <td className="flex justify-center gap-2 px-4 py-3">
                      <button
                        onClick={() => setEditing(pizza)}
                        className="flex items-center gap-1 px-3 py-1 text-white bg-purple-600 rounded hover:bg-purple-700"
                      >
                        <PencilSquareIcon className="w-4 h-4" />
                        Edit
                      </button>
                      <button
                        onClick={() => setDeleting(pizza)}
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
                    Không có sản phẩm nào
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {adding && (
        <AddModal
          newPizza={newPizza}
          onChange={setNewPizza}
          onClose={() => setAdding(false)}
          onAdd={handleAdd}
        />
      )}

      {editing && (
        <EditModal
          pizza={editing}
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

export default ManageProductsPage;
