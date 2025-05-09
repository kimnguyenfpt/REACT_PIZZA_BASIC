import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import { useDispatch, useSelector } from 'react-redux';
import { login, loginWithGoogle } from '../../redux/thunks/authThunks';
import { RootState } from '../../redux/store';

const LoginSchema = Yup.object().shape({
  email: Yup.string().email('Email không hợp lệ').required('Bắt buộc nhập email'),
  password: Yup.string().min(6, 'Mật khẩu ít nhất 6 ký tự').required('Bắt buộc nhập mật khẩu'),
});

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  
  useEffect(() => {
    // Nếu đã đăng nhập thì chuyển hướng đến trang chủ
    if (isAuthenticated) {
      navigate('/');
    }
  }, [isAuthenticated, navigate]);

  useEffect(() => {
    // Hiển thị lỗi từ Redux state
    if (error) {
      setErrorMessage(error);
    }
  }, [error]);

  const handleSubmit = async (values: { email: string; password: string }, { setSubmitting }: any) => {
    const result = await dispatch(login(values.email, values.password) as any);
    setSubmitting(false);
    
    if (result.success) {
      navigate('/');
    } else {
      setErrorMessage(result.message);
    }
  };

  const handleGoogleLoginSuccess = async (credentialResponse: any) => {
    if (credentialResponse.credential) {
      const result = await dispatch(loginWithGoogle(credentialResponse.credential) as any);
      
      if (result.success) {
        navigate('/');
      } else {
        setErrorMessage(result.message);
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen px-4 bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center mb-6 text-[#14274e]">Đăng nhập</h2>

        {/* Hiển thị thông báo lỗi */}
        {errorMessage && (
          <div className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">
            {errorMessage}
          </div>
        )}

        {/* Login with Google */}
        <div className="flex justify-center mb-4">
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={() => setErrorMessage('Đăng nhập Google thất bại')}
            useOneTap
            type="standard"
            theme="filled_blue"
            shape="rectangular"
            logo_alignment="center"
            text="signin_with"
            locale="vi"
          />
        </div>

        {/* Divider */}
        <div className="flex items-center my-4">
          <hr className="flex-grow border-gray-300" />
          <span className="mx-2 text-sm text-gray-400">Hoặc</span>
          <hr className="flex-grow border-gray-300" />
        </div>

        <Formik
          initialValues={{ email: '', password: '' }}
          validationSchema={LoginSchema}
          onSubmit={handleSubmit}
        >
          {({ isSubmitting }) => (
            <Form className="space-y-4">
              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <Field
                  type="email"
                  name="email"
                  className="block w-full px-4 py-2 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                  placeholder="you@example.com"
                />
                <ErrorMessage name="email" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              {/* Password */}
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Mật khẩu</label>
                <div className="relative">
                  <Field
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    className="block w-full px-4 py-2 pr-10 mt-1 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute text-gray-500 transform -translate-y-1/2 top-1/2 right-3 focus:outline-none"
                  >
                    {showPassword ? (
                      <EyeSlashIcon className="w-5 h-5" />
                    ) : (
                      <EyeIcon className="w-5 h-5" />
                    )}
                  </button>
                </div>
                <ErrorMessage name="password" component="div" className="mt-1 text-sm text-red-500" />
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={isSubmitting || loading}
                className="w-full bg-[#14274e] text-white py-2 px-4 rounded hover:bg-[#394867] transition disabled:opacity-70"
              >
                {isSubmitting || loading ? 'Đang xử lý...' : 'Đăng nhập'}
              </button>

              {/* Forgot password and Register */}
              <div className="flex items-center justify-between mt-4">
                <Link to="/forgot-password" className="text-sm text-blue-600 hover:underline">
                  Quên mật khẩu?
                </Link>
                <Link to="/register" className="text-sm text-blue-600 hover:underline">
                  Đăng ký tài khoản
                </Link>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};

export default LoginForm;
