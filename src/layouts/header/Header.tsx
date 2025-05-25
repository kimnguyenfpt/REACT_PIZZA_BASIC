import { Link } from 'react-router-dom';
import { useTheme } from '../../contexts/ThemeContext';
import { MoonIcon, SunIcon } from '@heroicons/react/24/solid'; // bạn cũng có thể thử outline
import AuthMenu from './AuthMenu';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

const Header = () => {
  const { theme, toggleTheme } = useTheme();
  const { isAuthenticated, user } = useSelector((state: RootState) => state.auth);
  console.log(user);

  return (
    <div className="flex items-center justify-between px-8 py-4 shadow"
      style={{ backgroundColor: theme === 'light' ? '#ffffff' : '#1e1e1e' }}>
      <Link to="/">
        <div className="text-[40px] font-bold cursor-pointer"
          style={{ color: theme === 'light' ? '#2d2d2d' : '#f5f5f5' }}>
          DevPizza
        </div>
      </Link>

      <div className="flex items-center gap-4">
        <button
          onClick={toggleTheme}
          className="p-2 transition bg-gray-200 rounded-full hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
        >
          {theme === 'light' ? (
            <SunIcon className="w-6 h-6 text-yellow-600" /> // ☀️ Sáng thì hiện SunIcon
          ) : (
            <MoonIcon className="w-6 h-6 text-white" />     // 🌙 Tối thì hiện MoonIcon
          )}
        </button>

        {isAuthenticated && user?.role === 'admin' && (
          <Link to="/manager" className="bg-[#14274E] text-white px-4 py-2 rounded-md">
            Manager
          </Link>
        )}

        <AuthMenu />
      </div>
    </div>
  );
};

export default Header;
