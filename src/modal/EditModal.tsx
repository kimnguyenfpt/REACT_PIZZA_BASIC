import { XMarkIcon } from '@heroicons/react/24/outline';
import Pizza from '../models/Pizzza.model';
import { useState } from 'react';

type Props = {
  pizza: Pizza;
  onClose: () => void;
  onSave: (updated: Pizza) => void;
};

const EditModal = ({ pizza, onClose, onSave }: Props) => {
  const [editedPizza, setEditedPizza] = useState<Pizza>({...pizza});
  
  const handleChange = (key: keyof Pizza, value: string | number) => {
    setEditedPizza(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = () => {
    onSave(editedPizza);
    console.log('✅ Sửa sản phẩm thành công:', editedPizza);
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
          value={editedPizza.name}
          onChange={e => handleChange('name', e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Tên sản phẩm"
        />
        <input
          type="text"
          value={editedPizza.desc}
          onChange={e => handleChange('desc', e.target.value)}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Mô tả"
        />
        <input
          type="number"
          value={editedPizza.price}
          onChange={e => handleChange('price', parseInt(e.target.value || '0'))}
          className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
          placeholder="Giá"
        />
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
