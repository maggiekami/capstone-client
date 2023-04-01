import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>{/* <Route path="/cart" element={<Cart />} /> */}</Routes>
      </BrowserRouter>
      <h1>hello</h1>
    </div>
  );
}

export default App;
