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
        <div>
          <h4 className="cart-item__name">{item.name}</h4>
        </div>
        {/* <p>£{item.price}</p> */}
        <div onClick={() => cart.removeItemFromCart(item.id)}>
          <RxMinusCircled />
        </div>
        <p className="cart-item__quantity">{item.quantity}</p>

        <div onClick={() => cart.addItemToCart(item.id)}>
          <RxPlusCircled />
        </div>

        <div onClick={() => cart.removeAllFromCart(item.id)}>
          <RxTrash />
        </div>
      </article>
    </>
  );
};
export default CartItem;
