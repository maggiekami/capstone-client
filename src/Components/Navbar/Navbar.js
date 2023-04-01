import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Modal from "react-modal";
import Cart from "../Cart/Cart";

const Navbar = () => {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  //   const handleCloseModalClick = (e) => {
  //     setShowModal(false);
  //     navigate("/");
  //   };

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
        <Cart />
        {/* <p>Video uploaded successfully</p>
        <button className="upload__modal-btn" onClick={handleClick}>
          Back to home page
        </button> */}
      </Modal>
    </>
  );
};

export default Navbar;
