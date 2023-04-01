import ProductCard from "../../components/CartItem/CartItem";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "react-loading-dot";

const Products = () => {
  const API_BASE_URL = "http://localhost:8080";

  const [products, setProducts] = useState(null);

  //   useEffect(() => {
  //     const getProducts = async () => {
  //       try {
  //         const { data } = await axios.get(`${API_BASE_URL}/products`);
  //         setProducts(data);
  //       } catch (err) {
  //         console.log(err);
  //       }
  //     };
  //     getProducts();
  //   }, []);

  //   if (!products) {
  //     return <Loading />;
  //   }
  return (
    <>
      <h1>Products here</h1>

      {/* <ProductCard product={product} /> */}
    </>
  );
};

export default Products;
