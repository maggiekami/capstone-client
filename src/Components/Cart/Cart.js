import { useContext } from "react";
import { CartContext } from "../../CartContext";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const cart = useContext(CartContext);
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cart.map((item) => {
          return <CartItem key={item.id} {...item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart-total">
          <h4>
            Total: <span>${cart.getTotal().toFixed(2)}</span>
          </h4>
        </div>
        <button>Cancel</button>
        <button>Go to checkout</button>
      </footer>
    </section>
  );
};

export default Cart;
