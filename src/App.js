import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CartProvider from "./CartContext";
import Products from "./pages/Products/Products";
import RegistrationForm from "./pages/Register/Register";
import LoginForm from "./pages/Login/Login";

function App() {
  return (
    <CartProvider>
      <div className="App">
        <BrowserRouter>
          <Navbar />
          <Routes>
            {/* jak chce landing page to potem zmien product z / na /products */}
            {/* <Route path="/" element={<Home />} /> */}
            <Route path="/" element={<Products />} />
            {/* <Route path="/:productId" element={<ProductDetails />} /> */}
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
