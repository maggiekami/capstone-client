import { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "react-loading-dot";
import "./ProductsMain.scss";
import ProductsSection from "../../Components/ProductsSection/ProductsSection";

const ProductsMain = () => {
  const API_BASE_URL = "http://localhost:8080";

  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get(`${API_BASE_URL}/product`);
        setProducts(data);
      } catch (err) {
        console.log(err);
      }
    };
    getProducts();
  }, []);

  if (!products) {
    return <Loading />;
  }

  return (
    <>
      <section className="products-main">
        {products.map((product) => {
          return <ProductsSection product={product} key={product.id} />;
        })}
      </section>
    </>
  );
};

export default ProductsMain;
