import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CartProvider from "./CartContext";
import Products from "./pages/Products/Products";
import RegistrationForm from "./pages/Register/Register";
import LoginForm from "./pages/Login/Login";
import CheckoutForm from "./pages/CheckoutForm/CheckoutForm";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Products />} />
            {/* <Route path="/:productId" element={<ProductDetails />} /> */}
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/order" element={<CheckoutForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
