import ProductCard from "../../components/ProductCard/ProductCard";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import axios from "axios";
import { Loading } from "react-loading-dot";

const Products = () => {
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

  return products.map((product) => {
    return <ProductCard product={product} key={product.id} />;
  });
};

export default Products;
