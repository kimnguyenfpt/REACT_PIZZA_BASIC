import { Outlet, useRoutes } from 'react-router-dom';
import Header from '../layouts/header/Header';
import Footer from '../layouts/footer/Footer';
import HomePages from '../pages/HomePages';
import CreatePizzaPage from '../pages/CreatePizzaPage';
import ManageProductsPage from '../ManageProduct/ManageProductsPage';
import ManageCategoriesPage from '../ManageCategory/ManageCategoriesPage';
import ManagerLayout from '../layouts/ManagerLayout/ManagerLayout';
import CategoriesPage from '../pages/CategoriesPage';
import LoginForm from '../auth/login/Login';
import RegisterForm from '../auth/register/Register';
import ProtectedRoute from './ProtectedRoute';
import ManagerUser from '../managerUser/ManagerUser';

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
        { path: 'categories', 
          element: <CategoriesPage /> 
        },
        { path: 'login', 
          element: <LoginForm /> 
        },
        { path: 'register', 
          element: <RegisterForm /> 
        },
        {
          path: '',
          element: <ProtectedRoute />,
          children: [
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
                {
                  path: 'users',
                  element: <ManagerUser />
                },
                { index: true, 
                  element: <div>📌 Chọn chức năng bên trái để quản lý</div> 
                }
              ]
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
