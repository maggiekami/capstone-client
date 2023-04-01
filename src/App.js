import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import CartProvider from "./CartContext";
import Products from "./pages/Products/Products";

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
          </Routes>
        </BrowserRouter>
      </div>
    </CartProvider>
  );
}

export default App;
