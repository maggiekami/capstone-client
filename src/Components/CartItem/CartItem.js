import "./CartItem.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
// import { getItemDetails } from "../../pages/Products/Products";

const CartItem = ({ item }) => {
  const cart = useContext(CartContext);

  const price = cart.getTotal();

  return (
    <>
      <article className="cart-item">
        <h4>{item.name}</h4>
        <p>{item.price}</p>
        <p>{item.quantity}</p>
        {/* when modalo pens (=click on basket, all functions below get triggered) */}
        <button onClick={() => cart.addItemToCart(item.id)}>+</button>
        <button onClick={() => cart.removeItemFromCart(item.id)}>-</button>
        <button onClick={() => cart.removeAllFromCart(item.id)}>X</button>
        {/* <p onClick={cart.removeItemFromCart(item.id)}>-</p> */}
        {/* <p onClick={cart.removeAllFromCart(item.id)}>X</p> */}
        {/* <img src={item.image} alt="product" className="cart__item-img" /> */}
      </article>
    </>
  );
};
export default CartItem;
