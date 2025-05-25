import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { register } from '../../redux/slices/authSlice';

const RegisterSchema = Yup.object().shape({
  name: Yup.string().required('Vui lòng nhập họ tên'),
  email: Yup.string().email('Email không hợp lệ').required('Vui lòng nhập email'),
  password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Vui lòng nhập mật khẩu').matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 
    'Mật khẩu phải có ít nhất 8 ký tự, bao gồm chữ cái, số và ký tự đặc biệt'),

  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Mật khẩu xác nhận không khớp')
    .required('Vui lòng xác nhận mật khẩu'),
});

const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { loading, error } = useAppSelector((state) => state.auth);
  
  useEffect(() => {
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = async (values: any, { setSubmitting }: any) => {
    try {
      setErrorMessage(null);
      const { name, email, password } = values;
      
      const result = await dispatch(register({ name, email, password })).unwrap();
      
      if (result) {
        navigate('/login');
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : 'Có lỗi xảy ra khi đăng ký');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-8 text-center bg-white rounded-lg shadow-md">
        <h2 className="mb-6 text-2xl font-bold">Đăng ký tài khoản</h2>
        
        {/* Hiển thị thông báo lỗi */}
        {errorMessage && (
          <div className="p-3 mb-4 text-sm text-left text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        <Formik
          initialValues={{ name: '', email: '', password: '', confirmPassword: '' }}
          validationSchema={RegisterSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4 text-left">
              <div>
                <label className="block mb-1 text-sm text-gray-600">Họ tên</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Eg: John Doe"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="name" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">Email</label>
                <Field
                  type="email"
                  name="email"
                  placeholder="Eg: johndoe@email.com"
                  className="w-full px-4 py-2 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">Mật khẩu</label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-3"
                  >
                    {showPassword ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <div>
                <label className="block mb-1 text-sm text-gray-600">Xác nhận mật khẩu</label>
                <div className="relative">
                  <Field
                    type={showConfirm ? 'text' : 'password'}
                    name="confirmPassword"
                    placeholder="••••••••"
                    className="w-full px-4 py-2 pr-10 bg-gray-100 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirm(!showConfirm)}
                    className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-3"
                  >
                    {showConfirm ? (
                      <EyeIcon className="w-5 h-5" />
                    ) : (
                      <EyeSlashIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="confirmPassword" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full py-2 text-white transition bg-[#14274e] hover:bg-[#394867] rounded disabled:opacity-70"
              >
                {isSubmitting || loading ? 'Đang xử lý...' : 'Đăng ký'}
              </button>
            </Form>
          )}
        </Formik>

        <p className="mt-6 text-gray-600 text-md">
          Bạn đã có tài khoản?{' '}
          <Link to="/login" className="text-blue-600 hover:underline">
            Đăng nhập
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterForm;
