import "./ProductsSection.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import pic from "../../assets/images/heroImg.jpg";
import ProductCard from "../ProductCard/ProductCard";
import StarRating from "../Rating/Rating";

const ProductsSection = ({ product }) => {
  const cart = useContext(CartContext);
  const productQuantity = cart.getItemQuantity(product.id);
  return (
    <>
      {/* <div className="container"> */}
      <section className="products">
        <div className="products__container">
          {/* <div className="products__header-flex">
            <div className="products__text">
              <h2>Our products</h2>
              <p>remove fsdfdsfdfdsf</p>
            </div> */}
          {/* <div className="products__icons-container">
            <BsArrowLeftShort className="products__icon" />
            <BsArrowRightShort className="products__icon" />
          </div> */}
        </div>
        <div className="products__main-container">
          <div className="products__main">
            {/* {products.map((product) => {
              return <ProductCard product={product} key={product.id} />;
            })} */}
            <div className="products__single">
              <div className="products__img-container">
                <img className="products__img" src={product.image} alt="knit" />

                <div className="products__overlay-info">
                  <h3 className="products__heading">Some text</h3>
                  <p className="products__overlay-text">lorem</p>
                  <BsArrowRightShort className="products__overlay-icon" />
                </div>
              </div>
              <div className="products__single-footer">
                <div className="products__number">{product.price}</div>
                <div className="products__info-flex">
                  <h6 className="products__info-heading">
                    <StarRating />
                  </h6>
                  <span className="products__flex">
                    <span className="products__dot">dot icon</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* </div> */}
      </section>
      {/* </div> */}
    </>
  );
};

export default ProductsSection;
