import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../../CartContext";
import CartItem from "../CartItem/CartItem";
import "./Cart.scss";

const Cart = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const cart = useContext(CartContext);

  const handleClick = (e) => {
    setShowModal(false);
    navigate("/order");
  };
  // const handleCloseModalClick = (e) => {
  //   navigate("/");
  // };

  const handleClickClose = (e) => {
    setShowModal(false);
  };

  return (
    <section className="cart">
      <header>
        <h2>Your Bag</h2>
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
            Total: <span>${cart.getTotal().toFixed(2)}</span>
          </h4>
        </div>
        {/* <button onClick={handleCloseModalClick}>Cancel</button> */}

        <button className="cart__button" onClick={handleClick}>
          Go to checkout
        </button>
        <button onClick={handleClickClose}>X</button>
      </footer>
    </section>
  );
};

export default Cart;
