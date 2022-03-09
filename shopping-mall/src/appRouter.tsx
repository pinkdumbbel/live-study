import { Route, Routes } from 'react-router-dom';
import MainPage from './pages';
import CartPage from './pages/cart';
import ProductsList from './pages/products';
import ProductDetailPage from './pages/products/[id]';

const AppRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<MainPage />}></Route>
      <Route path='/products' element={<ProductsList />}></Route>
      <Route path='/products/:id' element={<ProductDetailPage />}></Route>
      <Route path='/cart' element={<CartPage />}></Route>
    </Routes>
  );
};

export default AppRouter;
