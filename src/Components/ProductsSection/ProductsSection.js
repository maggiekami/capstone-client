import "./ProductsSection.scss";
import { BsArrowLeftShort } from "react-icons/bs";
import { BsArrowRightShort } from "react-icons/bs";
import pic from "../../assets/images/heroImg.jpg";

const ProductsSection = () => {
  return (
    <>
      <section className="products">
        <div className="products__container">
          <div className="products__header-flex">
            <div className="products__text">
              <h2>Our products</h2>
              <p>remove fsdfdsfdfdsf</p>
            </div>
            <div className="products__icons-container">
              <BsArrowLeftShort className="products__icon" />
              <BsArrowRightShort className="products__icon" />
            </div>
          </div>

          <div className="products__main">
            <div className="products__single">
              <div className="products__img-container">
                <img className="products__img" src={pic} alt="knit" />

                <div className="products__overlay-info">
                  <h3 className="products__heading">Some text</h3>
                  <p className="products__overlay-text">lorem ipsum</p>
                  <BsArrowRightShort className="products__overlay-icon" />
                </div>
              </div>
              <div className="products__single-footer">
                <div className="products__number">01</div>
                <div className="products__info-flex">
                  <h6 className="products__info-heading">London</h6>
                  <span className="products__flex">
                    <span className="products__dot">dot icon</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ProductsSection;
