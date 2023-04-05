import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { CartContext } from "../../CartContext";
import Modal from "react-modal";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  // console.log(cart.items);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleCloseModalClick = (e) => {
    setShowModal(false);
    navigate("/");
  };

  const handleClick = (e) => {
    setShowModal(true);
  };

  return (
    <>
      <header className="nav">
        <div className="nav__container">
          <nav className="nav__main">
            <button onClick={handleClick}>
              <FontAwesomeIcon icon={faCartShopping} />
              {productsCount}
            </button>
          </nav>
        </div>
      </header>
      <Modal
        className="nav__cart-modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        overlayClassName="nav__overlay"
      >
        {productsCount > 0 ? (
          <>
            <Cart />
            <button onClick={handleCloseModalClick}>Back</button>
          </>
        ) : (
          <>
            <h1>There are no items in your bag</h1>{" "}
            <button onClick={handleCloseModalClick}>Back</button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Navbar;
