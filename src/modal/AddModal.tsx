import { XMarkIcon } from '@heroicons/react/24/outline';
import Pizza from '../models/Pizzza.model';
import { useFormik } from 'formik';
import * as Yup from 'yup';


type Props = {
  newPizza: Pizza;
  onChange: (pizza: Pizza) => void;
  onClose: () => void;
  onAdd: (pizza: Pizza) => void;
};

const AddModal = ({ newPizza, onChange, onClose, onAdd }: Props) => {
  const formik = useFormik({
    initialValues: newPizza,
    validationSchema: Yup.object({
      name: Yup.string().required('Tên sản phẩm không được để trống'),
      desc: Yup.string().required('Mô tả không được để trống'),
      price: Yup.number().required('Giá là bắt buộc').positive('Giá phải lớn hơn 0'),
    }),
    onSubmit: (values: Pizza) => {
      onAdd(values);
      onClose();
      formik.resetForm();
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl w-[90%] max-w-md relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>

        <h3 className="mb-4 text-xl font-bold">➕ Thêm sản phẩm mới</h3>

        <form onSubmit={formik.handleSubmit} className="space-y-4">
          <div>
            <input
              type="text"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Tên sản phẩm"
              className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            />
            {formik.touched.name && formik.errors.name && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.name}</p>
            )}
          </div>

          <div>
            <input
              type="text"
              name="desc"
              value={formik.values.desc}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Mô tả"
              className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            />
            {formik.touched.desc && formik.errors.desc && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.desc}</p>
            )}
          </div>

          <div>
            <input
              type="number"
              name="price"
              value={formik.values.price}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              placeholder="Giá"
              className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            />
            {formik.touched.price && formik.errors.price && (
              <p className="mt-1 text-sm text-red-500">{formik.errors.price}</p>
            )}
          </div>

          <button
            type="submit"
            className="w-full py-2 text-white bg-green-600 rounded hover:bg-green-700"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
