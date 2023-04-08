import "./Navbar.scss";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import icon from "../../assets/images/knitting.png";
import { AiOutlineShoppingCart } from "react-icons/ai";
import { GiSewingNeedle } from "react-icons/gi";
import { BiUserCircle } from "react-icons/bi";

// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
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
    // navigate("/");
  };

  const handleClick = (e) => {
    setShowModal(true);
  };

  return (
    <>
      <section className="header">
        <header className="header__section">
          <div className="header__logo-div">
            <h1 className="header__heading">
              <GiSewingNeedle className="header__icon" />
              Renee Crafts
            </h1>
          </div>
          <nav className="header__navbar">
            <ul className="header__list">
              <li className="header__nav-item">
                <BiUserCircle className="header__icon--left" />
              </li>
              <li onClick={handleClick}>
                <AiOutlineShoppingCart className="header__icon--left" />
                {productsCount}
              </li>
            </ul>
          </nav>
        </header>
      </section>

      <Modal
        className="header__cart-modal"
        isOpen={showModal}
        onRequestClose={() => setShowModal(false)}
        ariaHideApp={false}
        overlayClassName="header__overlay"
      >
        {productsCount > 0 ? (
          <>
            <Cart />
            <button
              className="header__back-btn"
              onClick={handleCloseModalClick}
            >
              Back
            </button>
          </>
        ) : (
          <>
            <h1>There are no items in your bag</h1>{" "}
            <button
              className="header__back-btn"
              onClick={handleCloseModalClick}
            >
              Back
            </button>
          </>
        )}
      </Modal>
    </>
  );
};

export default Navbar;
