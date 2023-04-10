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
  const [transparent, setTransparent] = useState("header__section");
  const navigate = useNavigate();
  const cart = useContext(CartContext);

  const addBackground = () => {
    if (window.scrollY >= 10) {
      setTransparent("header__section header__section-active");
    } else {
      setTransparent("header__section");
    }
  };
  window.addEventListener("scroll", addBackground);

  const productsCount = cart.items.reduce(
    (sum, product) => sum + product.quantity,
    0
  );

  const handleCloseModalClick = (e) => {
    setShowModal(false);
    // navigate("/");
  };
  const handleCheckoutClick = (e) => {
    setShowModal(false);
    navigate("/order");
  };

  const handleClick = (e) => {
    setShowModal(true);
  };

  const handleUserClick = (e) => {
    navigate("/register");
  };

  return (
    <>
      <section className="header">
        <header className={transparent}>
          <div className="header__logo-div">
            <h1 className="header__heading">
              <GiSewingNeedle className="header__icon" />
              Renee Crafts
            </h1>
          </div>
          <nav className="header__navbar">
            <ul className="header__list">
              <li onClick={handleUserClick} className="header__nav-item">
                <BiUserCircle className="header__icon--left" />
              </li>
              <li onClick={handleClick}>
                <AiOutlineShoppingCart className="header__icon--right" />
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
            <div className="header__btn-container">
              <button
                className="header__back-button"
                onClick={handleCloseModalClick}
              >
                Back
              </button>
              <button
                className="header__back-button"
                onClick={handleCheckoutClick}
              >
                Checkout
              </button>
            </div>
          </>
        ) : (
          <>
            <h1>There are no items in your bag</h1>{" "}
            <button
              className="header__back-button"
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
