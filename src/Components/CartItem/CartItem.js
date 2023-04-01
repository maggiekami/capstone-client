import "./CartItem.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

const CartItem = (props) => {
  const product = props.product;
  const cart = useContext(CartContext);
  const productQuantity = cart.getItemQuantity(product.id);
  return (
    <>
      <article className="cart__item">
        <img src={product.img} alt={product.title} className="cart__item-img" />
        <div>
          <h4>{product.name}</h4>
          <h4 className="cart__price">${product.price}</h4>
          {/* remove button */}
          <button
            className="remove-btn"
            onClick={() => cart.removeAllFromCart(product.id)}
          >
            X
          </button>
        </div>
        <div>
          {/* increase amount */}
          <button
            className="amount-btn"
            onClick={() => cart.addItemToCart(product.id)}
          >
            +
          </button>
          {/* amount */}
          <p className="cart__quantity">{productQuantity}</p>
          {/* decrease amount */}
          <button
            className="amount-btn"
            onClick={() => cart.removeItemFromCart(product.id)}
          >
            -
          </button>
        </div>
      </article>
    </>

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
