import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const cart = useContext(CartContext);

  // const handleClick = (e) => {
  //   setShowModal(false);
  //   navigate("/order");
  // };

  return (
    <section className="cart">
      <header className="cart__heading-container">
        <h2 className="cart__heading">Your Bag</h2>
      </header>
      <div className="cart__items-container">
        {cart.items.map((item) => {
          return <CartItem key={item.id} item={item} />;
        })}
      </div>

      <footer className="cart__footer">
        {/* <hr /> */}
        <div className="cart__total-container">
          <h4 className="cart__total">
            Total:{" "}
            <span className="cart__total-amount">
              £{cart.getTotal().toFixed(2)}
            </span>
          </h4>
        </div>
        {/* <button onClick={handleCloseModalClick}>Cancel</button> */}

        {/* <button className="cart__button" onClick={handleClick}>
          Go to checkout
        </button> */}
      </footer>
    </section>
  );
};

export default Cart;
