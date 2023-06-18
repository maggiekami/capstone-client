import "./ProductsSection.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

import StarRating from "../Rating/Rating";
import { RxPlusCircled } from "react-icons/rx";
import { RxMinusCircled } from "react-icons/rx";

const ProductsSection = ({ product }) => {
  const cart = useContext(CartContext);
  const productQuantity = cart.getItemQuantity(product.id);
  return (
    <>
      <section className="products">
        <div className="products__container"></div>
        <div className="products__main-container">
          <div className="products__main">
            <div className="products__single">
              <div className="products__img-container">
                <img
                  className="products__img"
                  src={product.image}
                  alt="product"
                />

                <div className="products__overlay-info">
                  <h3 className="products__overlay-heading">{product.name}</h3>
                  <p className="products__overlay-text">
                    {product.description}
                  </p>
                </div>
              </div>
              <div className="products__single-footer">
                <div className="products__upper-container">
                  <div className="products__number">
                    {productQuantity > 0 ? (
                      <div className="products__quantity-text">
                        In your bag: {productQuantity}
                      </div>
                    ) : (
                      <div className="products__quantity-text"></div>
                    )}
                  </div>
                  <div className="products__flex">
                    <span
                      className="products__dot"
                      onClick={() => cart.removeItemFromCart(product.id)}
                    >
                      <RxMinusCircled />
                    </span>
                    <span
                      className="products__dot"
                      onClick={() => cart.addItemToCart(product.id)}
                    >
                      <RxPlusCircled />
                    </span>
                  </div>
                </div>

                <div className="products__info-flex">
                  <h6 className="products__info-heading">
                    <StarRating productId={product.id} />
                  </h6>
                  <div className="products__number">£{product.price}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
