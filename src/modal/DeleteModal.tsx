import { XMarkIcon } from '@heroicons/react/24/outline';

type Props = {
  name: string;
  onClose: () => void;
  onConfirm: () => void;
};

const DeleteModal = ({ name, onClose, onConfirm }: Props) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl w-[90%] max-w-sm space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>

        <h3 className="text-lg font-bold text-red-600 dark:text-red-400">
          ⚠️ Xác nhận xoá
        </h3>
        <p className="text-sm dark:text-gray-300">
          Bạn có chắc chắn muốn xoá sản phẩm <strong>{name}</strong>?
        </p>

        <div className="flex justify-end gap-3 pt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 rounded dark:bg-gray-600 hover:bg-gray-300 dark:hover:bg-gray-500"
          >
            Huỷ
          </button>
          <button
            onClick={onConfirm}
            className="px-4 py-2 text-white bg-red-600 rounded hover:bg-red-700"
          >
            Xoá
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
