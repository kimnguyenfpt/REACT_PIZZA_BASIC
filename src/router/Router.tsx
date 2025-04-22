import { Outlet, useRoutes } from 'react-router-dom';
import Header from '../layouts/header/Header';
import Footer from '../layouts/footer/Footer';
import HomePages from '../pages/HomePages';
import CreatePizzaPage from '../pages/CreatePizzaPage';
import ManageProductsPage from '../ManageProduct/ManageProductsPage';
import ManageCategoriesPage from '../ManageCategory/ManageCategories';
import ManagerLayout from '../layouts/ManagerLayout/ManagerLayout';

const Layout = () => (
  <div>
    <Header />
    <Outlet />
    <Footer />
  </div>
);

const Router = () => {
  const routes = [
    {
      path: '/',
      element: <Layout />,
      children: [
        { index: true, 
          element: <HomePages /> 
        },
        { path: 'create-pizza', 
          element: <CreatePizzaPage /> 
        },

        {
          path: 'manager',
          element: <ManagerLayout />,
          children: [
            { path: 'products', 
              element: <ManageProductsPage /> 
            },
            { path: 'categories', 
              element: <ManageCategoriesPage /> 
            },
            { index: true, 
              element: <div>📌 Chọn chức năng bên trái để quản lý</div> 
            }
          ]
        }
      ]
    },

    {
      path: '*',
      element: <div>404 - Trang không tồn tại</div>
    }
  ];

  return useRoutes(routes);
};

export default Router;
