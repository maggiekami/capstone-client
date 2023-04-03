import { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { CartContext } from "../../CartContext";
import CartItem from "../CartItem/CartItem";

const Cart = () => {
  const navigate = useNavigate();

  const cart = useContext(CartContext);

  const handleCloseModalClick = (e) => {
    navigate("/");
  };

  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {cart.items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>
      <footer>
        <hr />
        <div className="cart__total">
          <h4>
            {/* Total: <span>${cart.getTotal().toFixed(2)}</span> */}
            {/* Total: <span>£{cart.getTotal()}</span> */}
          </h4>
        </div>
        {/* <button onClick={handleCloseModalClick}>Cancel</button> */}
        <button>Go to checkout</button>
      </footer>
    </section>
  );
};

export default Cart;
