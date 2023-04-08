import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.scss";

// import * as yup from "yup";

const URL = process.env.REACT_APP_BACKEND_URL;

const CheckoutForm = () => {
  const cart = useContext(CartContext);

  const initialValues = {
    address: "",
    fName: "",
    lName: "",
    total: "",
  };

  const [formFields, setFormFields] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid = () => {
    if (!formFields.address || !formFields.fName || !formFields.lName) {
      setIsFormValid(false);
    } else setIsFormValid(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // isValid();

    const newOrder = {
      address: formFields.address,
      fName: formFields.fName,
      lName: formFields.lName,
      total: cart.getTotal(),
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${URL}/order`, newOrder);
      console.log(newOrder);
      console.log(data);
      navigate("/stripe");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      // console.log("wrong on client");
      // console.log(error.message);
    }
  };

  //     alert("Registration successful.");
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="form">
      <section className="form__title-wrapper">
        <div className="form__section-container form__section-container--title-btn">
          <h2 className="form__title">Place yourt order</h2>
        </div>
      </section>

      <section className="form__input-container">
        <section className="form__section">
          <div className="form__section-container">
            <h3 className="form__section-title">Warehouse Details</h3>
            <label htmlFor="warehouse-name" className="form__label">
              New order
            </label>
            <input
              id="address"
              type="text"
              className={
                error.address
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="address"
              placeholder="Please enter address.."
              onChange={handleChange}
              value={formFields.address}
            />
            {error.address && (
              <span className="form__error">This field is required</span>
            )}

            <label htmlFor="fName" className="form__label">
              City
            </label>
            <input
              id="fname"
              type="text"
              className={
                error.Fname
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="fName"
              placeholder="Please enter your name..."
              onChange={handleChange}
              value={formFields.fName}
            />
            {error.city && (
              <span className="form__error">Please provide a valid city</span>
            )}
            <label htmlFor="country-name" className="form__label">
              Country
            </label>
            <input
              id="country-name"
              type="text"
              className={
                error.country
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="country"
              placeholder="Please enter country..."
              onChange={handleChange}
              value={formFields.country}
            />
            {error.country && (
              <span className="form__error">
                Please provide a valid country
              </span>
            )}
          </div>
        </section>

        <section className="form__section">
          <div className="form__section-container">
            <h3 className="form__section-title">Contact Details</h3>
            <label htmlFor="contact-name" className="form__label">
              Contact Name
            </label>
            <input
              id="contact-name"
              type="text"
              className={
                error.contact_name
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="contact_name"
              placeholder="Please enter name..."
              onChange={handleChange}
              value={formFields.contact_name}
            />
            {error.contact_name && (
              <span className="form__error">Please provide a name</span>
            )}
            <label htmlFor="position-name" className="form__label">
              Position
            </label>
            <input
              id="position-name"
              type="text"
              className={
                error.contact_position
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="contact_position"
              placeholder="Please enter position..."
              onChange={handleChange}
              value={formFields.contact_position}
            />
            {error.contact_position && (
              <span className="form__error">Please add a position</span>
            )}
            <label htmlFor="phone-name" className="form__label">
              Phone Number
            </label>
            <input
              id="phone-name"
              type="text"
              className={
                error.contact_phone
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="contact_phone"
              placeholder="Please enter phone number..."
              onChange={handleChange}
              value={formFields.contact_phone}
            />
            {error.contact_phone && (
              <span className="form__error">
                Invalid phone number format (ex. +1 (646) 123-1234)
              </span>
            )}
            <label htmlFor="email-name" className="form__label">
              Email
            </label>
            <input
              type="email"
              className={
                error.contact_email
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="contact_email"
              placeholder="Please enter email..."
              onChange={handleChange}
              value={formFields.contact_email}
            />
            {error.contact_email && (
              <span className="form__error">
                Invalid email format (ex. 'user@example.com')
              </span>
            )}
          </div>
        </section>
      </section>
      <section className="form__actions">
        <div className="form__section-container form__section-container--actions">
          <button
            onClick={() => navigate("/warehouses")}
            className="form__btn form__btn--cancel"
          >
            Cancel
          </button>
          <button className="form__btn form__btn--submit">+ Add item</button>
        </div>
        {error && (
          <div className="form__error-all">
            <span>All fields are required</span>
          </div>
        )}
      </section>
    </form>
  );

  // ---------------
  //   <div className="checkout">
  //     <h2>Checkout</h2>
  //     <form
  //       className="checkout__form"
  //       onSubmit={handleSubmit}
  //       //   onBlur={isValid}
  //     >
  //       <div className="checkout-container">
  //         <label htmlFor="address">Address</label>
  //         <input
  //           type="text"
  //           name="address"
  //           // className={
  //           //     error.email
  //           //       ? "form__text-input form__text-input-error"
  //           //       : "form__text-input"
  //           //   }
  //           id="address"
  //           onChange={handleChange}
  //           value={formFields.email}
  //           placeholder="Email"
  //         />
  //         {/* {error.email && (
  //           <span className="form__error">
  //             Invalid email format (ex. 'user@example.com')
  //           </span>
  //         )} */}
  //       </div>
  //       <div className="checkout-container">
  //         <label htmlFor="fName">First Name</label>
  //         <input
  //           type="text"
  //           name="fName"
  //           // className={
  //           //     error.fName
  //           //       ? "form__text-input form__text-input-error"
  //           //       : "form__text-input"
  //           //   }
  //           id="fName"
  //           value={formFields.fName}
  //           onChange={handleChange}
  //           placeholder="First name"
  //         />
  //         {/* {error.fName && (
  //           <span className="form__error">This field is required</span>
  //         )} */}
  //       </div>
  //       <div className="checkout-container">
  //         <label htmlFor="lName">Last Name</label>
  //         <input
  //           type="text"
  //           name="lName"
  //           // className={
  //           //     error.lName
  //           //       ? "form__text-input form__text-input-error"
  //           //       : "form__text-input"
  //           //   }
  //           id="lName"
  //           value={formFields.lName}
  //           onChange={handleChange}
  //           placeholder="Last name"
  //         />
  //         {/* {error.lName && (
  //           <span className="form__error">This field is required</span>
  //         )} */}
  //       </div>
  //       <div className="checkout-container">
  //         <label htmlFor="total">Total</label>
  //         <input
  //           type="text"
  //           name="total"
  //           onChange={handleChange}
  //           // className={
  //           //     error.address
  //           //       ? "form__text-input form__text-input-error"
  //           //       : "form__text-input"
  //           //   }
  //           id="total"
  //           value={cart.getTotal()}
  //         />
  //       </div>
  //       <div className="checkout-container">
  //         <button
  //           type="submit"
  //           //   disabled={!isFormValid}
  //         >
  //           Checkout
  //         </button>
  //         {/* <button
  //           type="button"
  //           onClick={handleStripe}
  //           //   disabled={!isFormValid}
  //         >
  //           Stripe
  //         </button> */}
  //         {/* {!isFormValid && (
  //           <span className="form__error">All fields are required</span>
  //         )} */}
  //       </div>
  //     </form>
  //   </div>
  // );
};

export default CheckoutForm;
