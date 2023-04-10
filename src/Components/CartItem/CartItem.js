import "./CartItem.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";
import { RxPlusCircled } from "react-icons/rx";
import { RxMinusCircled } from "react-icons/rx";
import { RxTrash } from "react-icons/rx";

// import { getItemDetails } from "../../pages/Products/Products";

const CartItem = ({ item }) => {
  const cart = useContext(CartContext);

  const price = cart.getTotal();

  return (
    <>
      <article className="cart-item">
        <div className="cart-item__main-container">
          <div className="cart-item__name-container">
            <h4 className="cart-item__name">{item.name}</h4>
          </div>
          <div className="cart-item__actions">
            <div
              className="cart-item__minus"
              onClick={() => cart.removeItemFromCart(item.id)}
            >
              <RxMinusCircled />
            </div>
            <p className="cart-item__quantity">{item.quantity}</p>

            <div
              className="cart-item__plus"
              onClick={() => cart.addItemToCart(item.id)}
            >
              <RxPlusCircled />
            </div>

            <div
              className="cart-item__bin"
              onClick={() => cart.removeAllFromCart(item.id)}
            >
              <RxTrash />
            </div>
          </div>
        </div>
      </article>
    </>
  );
};
export default CartItem;
