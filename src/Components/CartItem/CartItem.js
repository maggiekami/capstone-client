import "./CartItem.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
// import { getItemDetails } from "../../pages/Products/Products";

const CartItem = ({ id }) => {
  const cart = useContext(CartContext);

  // const itemDetails = cart.fetchItemData(id);

  return (
    <>
      <h4>{id}</h4>
    </>

    /* <article className="cart__item">
        <img
          src={singleProduct.image}
          alt={singleProduct.name}
          className="cart__item-img"
        /> */
    /* <div>
          <h4>{productData.name}</h4>
          <p className="cart__price">
            ${(quantity * productData.price).toFixed(2)}
          </p>

          <button
            className="remove-btn"
            onClick={() => cart.removeAllFromCart(cart.product.id)}
          >
            X
          </button>
        </div>
        <div>
          <button
            className="amount-btn"
            onClick={() => cart.addItemToCart(cart.product.id)}
          >
            +
          </button>

          <p className="cart__quantity">{cart.productQuantity}</p>
          {/* decrease amount */
    /* <button
            className="amount-btn"
            onClick={() => cart.removeItemFromCart(cart.product.id)}
          >
            -
          </button>
        </div> */
    //   </article>
    // </>

    /* <article>
      <h1>card</h1>
      <price>3.33</price>
      <button onClick={() => cart.addItemToCart(product.id)}>
        add to basket
      </button>
    </article> */
  );
};
export default CartItem;
