import './App.css';
import './index.css';
import { createHashRouter, RouterProvider } from 'react-router-dom';
import Cart from './Components/Cart/Cart'
import Brands from './Components/Brands/Brands';
import {
  QueryClient,
  QueryClientProvider
} from "@tanstack/react-query";
import Categories from './Components/Categories/Categories';
import NotFound from './Components/NotFound/NotFound';
import Products from './Components/Products/Products';
import Login from './Components/Login/Login';
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import ForgetPassword from './Components/ForgetPassword/ForgetPassword';
import ResetPassword from './Components/ResetPassword/ResetPassword';
import UserContextProvider from './context/userContext';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';
import ProductDetails from './Components/ProductDetails/ProductDetails';
import CartContextProvider from './context/CartContext';
import { Toaster } from 'react-hot-toast';
import WishList from './Components/WishList/WishList';
import CheckOut from './Components/CheckOut/CheckOut';
import AllOrders from './Components/AllOrders/AllOrders';
import BrandDetails from './Components/BrandDetails/BrandDetails';
import CategoriesDetails from './Components/CategoriesDetails/CategoriesDetails';
import WishListContextProvider from './context/WishListContext';
import Register from './Components/Register/Register';

function App() {

let routers = createHashRouter([
  {
    path: '',
    element: <Layout />,
    children: [
      { index: true, element: <Register /> },
      { path: 'login', element: <Login /> },
      { path: 'forgetPassword', element: <ForgetPassword /> },
      { path: 'resetPassword', element: <ResetPassword /> },
      { path: 'home', element: <ProtectedRoute><Home /></ProtectedRoute> },
      { path: 'cart', element: <ProtectedRoute><Cart /></ProtectedRoute> },
      { path: 'wishlist', element: <ProtectedRoute><WishList /></ProtectedRoute> },
      { path: 'products', element: <ProtectedRoute><Products /></ProtectedRoute> },
      { path: 'checkout', element: <ProtectedRoute><CheckOut /></ProtectedRoute> },
      { path: 'allorders', element: <ProtectedRoute><AllOrders /></ProtectedRoute> },
      { path: 'productdetails/:id', element: <ProtectedRoute><ProductDetails /></ProtectedRoute> },
      { path: 'brands/:id', element: <ProtectedRoute><BrandDetails /></ProtectedRoute> },
      { path: 'categories/:id', element: <ProtectedRoute><CategoriesDetails /></ProtectedRoute> },
      { path: '*', element: <NotFound /> },
    ],
  },
]);

  


const query= new QueryClient();

  return <>
  <QueryClientProvider client={query}>
    <WishListContextProvider>
      <CartContextProvider>
        <UserContextProvider>
          <RouterProvider router={routers}></RouterProvider>
          <Toaster/>
        </UserContextProvider>
      </CartContextProvider>
    </WishListContextProvider>
  </QueryClientProvider>
    </>
}

export default App
