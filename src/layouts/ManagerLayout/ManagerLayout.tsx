import { NavLink, Outlet } from 'react-router-dom';

const ManagerLayout = () => {
  return (
    <div className="flex min-h-[calc(100vh-200px)]"> {/* trừ Header + Footer */}
      {/* Sidebar */}
      <aside className="w-[220px] bg-[#14274e] text-white p-4">
        <h2 className="mb-6 text-xl font-bold">Quản lý</h2>
        <nav className="flex flex-col gap-3">
          <NavLink to="/manager/products" className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"}>
            🍕 Sản phẩm
          </NavLink>
          <NavLink to="/manager/categories" className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"}>
            🗂️ Danh mục
          </NavLink>
          <NavLink to="/manager/users" className={({ isActive }) =>
            isActive ? "underline font-semibold" : "hover:underline"}>
            👤 Người dùng
          </NavLink>
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-white dark:bg-[#1e1e1e] text-[#14274e] dark:text-white">
        <Outlet />
      </main>
    </div>
  );
};

export default ManagerLayout;
