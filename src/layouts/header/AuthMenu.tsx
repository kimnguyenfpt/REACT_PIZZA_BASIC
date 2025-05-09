import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../redux/store';
import { logout } from '../../redux/thunks/authThunks';
import { UserIcon, ArrowRightOnRectangleIcon, Cog6ToothIcon } from '@heroicons/react/24/outline';

const AuthMenu = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { user, isAuthenticated } = useSelector((state: RootState) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Click outside to close menu
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleLogout = () => {
    dispatch(logout() as any);
    navigate('/login');
    setIsOpen(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="flex items-center space-x-4">
        <Link to="/login" className="text-gray-700 hover:text-[#14274e] dark:text-gray-300 dark:hover:text-white">
          Đăng nhập
        </Link>
        <Link
          to="/register"
          className="px-4 py-2 text-white bg-[#14274e] rounded-md hover:bg-[#394867] dark:bg-blue-600 dark:hover:bg-blue-700"
        >
          Đăng ký
        </Link>
      </div>
    );
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="flex items-center space-x-2 focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        <div className="w-8 h-8 overflow-hidden bg-gray-200 rounded-full">
          {user?.avatar ? (
            <img src={user.avatar} alt="User Avatar" className="object-cover w-full h-full" />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-gray-500">
              <UserIcon className="w-5 h-5" />
            </div>
          )}
        </div>
        <span className="text-gray-700 dark:text-gray-300">{user?.name || 'Người dùng'}</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white rounded-md shadow-lg w-48 dark:bg-gray-800">
          <div className="p-3 border-b border-gray-100 dark:border-gray-700">
            <p className="text-sm font-medium text-gray-900 dark:text-white">{user?.name}</p>
            <p className="text-xs text-gray-500 truncate dark:text-gray-400">{user?.email}</p>
          </div>
          <div className="py-1">
            <Link
              to="/profile"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <UserIcon className="w-4 h-4 mr-2" />
              Hồ sơ
            </Link>
            <Link
              to="/settings"
              className="flex items-center px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
              onClick={() => setIsOpen(false)}
            >
              <Cog6ToothIcon className="w-4 h-4 mr-2" />
              Cài đặt
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center w-full px-4 py-2 text-sm text-left text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              <ArrowRightOnRectangleIcon className="w-4 h-4 mr-2" />
              Đăng xuất
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default AuthMenu; 