import React, { useEffect, useState } from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import { getCategories } from '../service/categoryService';
import Category from '../models/Category.model';
import Product from '../models/Product.model';

type Props = {
  newProduct: Product;
  onChange: (product: Product) => void;
  onClose: () => void;
  onAdd: (product: Product) => void;
};

const AddModal = ({ newProduct, onChange, onClose, onAdd }: Props) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const res = await getCategories();
        if (res.success) {
          setCategories(res.data);
        } else {
          console.error('❌ Lỗi khi lấy danh mục:', res.message);
        }
      } catch (error) {
        console.error('❌ Lỗi khi lấy danh mục:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const formik = useFormik({
    initialValues: {
      name: newProduct.name || '',
      description: newProduct.description || '',
      price: newProduct.price || '',
      image: newProduct.image || '',
      categoryId: newProduct.categoryId || '',
      active: newProduct.active || false,
    },
    validationSchema: Yup.object({
      name: Yup.string().required('Tên sản phẩm là bắt buộc'),
      description: Yup.string().required('Mô tả là bắt buộc'),
      price: Yup.number()
        .typeError('Giá phải là số')
        .moreThan(0, 'Giá phải lớn hơn 0')
        .required('Giá là bắt buộc'),
      image: Yup.string().url('URL không hợp lệ').required('URL hình ảnh là bắt buộc'),
      categoryId: Yup.string().required('Danh mục là bắt buộc'),
    }),
    onSubmit: (values) => {
      onAdd({ ...values, price: Number(values.price) } as Product);
    },
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white dark:bg-[#2e2e2e] p-6 rounded-xl w-[90%] max-w-md space-y-4 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          <XMarkIcon className="w-6 h-6 text-gray-500 hover:text-red-500" />
        </button>
        <h3 className="text-xl font-bold">➕ Thêm sản phẩm mới</h3>

        <form onSubmit={formik.handleSubmit} className="space-y-3">
          <input
            name="name"
            type="text"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            placeholder="Tên sản phẩm"
          />
          {formik.touched.name && formik.errors.name && (
            <p className="text-red-500 text-sm">{formik.errors.name}</p>
          )}

          <input
            name="description"
            type="text"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            placeholder="Mô tả"
          />
          {formik.touched.description && formik.errors.description && (
            <p className="text-red-500 text-sm">{formik.errors.description}</p>
          )}

          <input
            name="price"
            type="number"
            inputMode="decimal"
            value={formik.values.price}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            placeholder="Giá"
          />
          {formik.touched.price && formik.errors.price && (
            <p className="text-red-500 text-sm">{formik.errors.price}</p>
          )}

          <input
            name="image"
            type="text"
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
            placeholder="URL hình ảnh"
          />
          {formik.touched.image && formik.errors.image && (
            <p className="text-red-500 text-sm">{formik.errors.image}</p>
          )}

          <div>
            <label className="block mb-1 text-sm font-medium text-gray-900 dark:text-white">
              Danh mục
            </label>
            <select
              name="categoryId"
              value={formik.values.categoryId}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              className="w-full p-2 rounded border dark:bg-[#1e1e1e] dark:text-white"
              disabled={loading}
            >
              <option value="">-- Chọn danh mục --</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>
                  {cat.name}
                </option>
              ))}
            </select>
            {formik.touched.categoryId && formik.errors.categoryId && (
              <p className="text-red-500 text-sm">{formik.errors.categoryId}</p>
            )}
            {loading && <p className="mt-1 text-sm text-gray-500">Đang tải danh mục...</p>}
          </div>

          <div className="flex items-center">
            <input
              name="active"
              type="checkbox"
              checked={formik.values.active}
              onChange={formik.handleChange}
              className="w-4 h-4 mr-2"
            />
            <label htmlFor="active" className="text-sm text-gray-700 dark:text-gray-300">
              Kích hoạt
            </label>
          </div>

          <button
            type="submit"
            className="w-full py-2 mt-2 text-white bg-blue-600 rounded hover:bg-blue-700"
          >
            Thêm sản phẩm
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddModal;
