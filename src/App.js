import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailsPage from './pages/ProductDetailsPage';
import CartPage from './pages/CartPage';

function App() {
  return (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route exact path="/products" element={<ProductsPage />} />
      <Route path="/products/:productId" element={<ProductDetailsPage />} />
      <Route path="/cart" element={<CartPage />} />
    </Routes>
  </BrowserRouter>
  );
}

export default App;
