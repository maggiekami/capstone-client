import "./Navbar.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <header className="nav">
      <div className="nav__container">
        <nav className="logo-container">
          <button>
            <FontAwesomeIcon icon={faCartShopping} />
          </button>
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
