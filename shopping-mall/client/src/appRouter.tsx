import { Route, Routes } from 'react-router-dom';
import MainPage from './pages';
import AdminPage from './pages/admin';
import CartPage from './pages/cart';
import PaymentPage from './pages/payment';
import ProductsList from './pages/products';
import ProductDetailPage from './pages/products/[id]';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/products' element={<ProductsList />}></Route>
      <Route path='/products/:id' element={<ProductDetailPage />}></Route>
      <Route path='/cart' element={<CartPage />}></Route>
      <Route path='/payment' element={<PaymentPage />}></Route>
      <Route path='/admin' element={<AdminPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
