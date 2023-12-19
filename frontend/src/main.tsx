import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { ChakraProvider } from '@chakra-ui/react';
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import UserRegistration from './UserRegistration.tsx';
import UserDashboard from './pages/UserDashboard.tsx';
import Login from './login.tsx';
import UserProfile from './pages/UserProfile.tsx';
import { DashboardSoldPerMonthChart } from './components/Charts/DashboardSoldPerMonthChart.tsx';
import UploadedProducts from './pages/UploadedProducts.tsx';
import CartCheckout from './pages/CartCheckout.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <h2>Not Found</h2>,
    children: [
      {
        path: 'dashboard',
        element: <UserDashboard />,
        children: [
          {
            path: 'profile/users/:userId',
            element: <UserProfile />,
          },
          {
            path: 'profile/users/product-page',
            element: <UploadedProducts />,
          },
          {
            path: 'profile/users/chart',
            element: <DashboardSoldPerMonthChart />,
          },
        ],
      },
      {
        path: 'register',
        element: <UserRegistration />,
      },
      {
        path: 'login',
        element: <Login />,
      },
      {
        path: 'test',
        element: <CartCheckout />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>
);
