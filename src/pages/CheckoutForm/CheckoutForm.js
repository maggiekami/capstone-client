import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./CheckoutForm.scss";
import * as yup from "yup";

const URL = process.env.REACT_APP_BACKEND_URL;

const schema = yup.object().shape({
  fName: yup.string().required(),
  lName: yup.string().required(),
  address: yup.string().required(),
});

const CheckoutForm = () => {
  const cart = useContext(CartContext);

  const initialValues = {
    fName: "",
    lName: "",
    address: "",
    // total: "",
  };

  const [formFields, setFormFields] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const isValid = () => {
    if (!formFields.fName || !formFields.lName || !formFields.address) {
      setIsFormValid(false);
    } else setIsFormValid(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    schema
      .validateAt(name, { [name]: value })
      .then(() => {
        // Clear error message for this field
        setError((prevError) => ({ ...prevError, [name]: "" }));
      })
      .catch((err) => {
        // Set error message for this field
        setError((prevError) => ({ ...prevError, [name]: err.message }));
      });
    setFormFields({
      ...formFields,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    isValid();

    const newOrder = {
      // address: formFields.address,
      fName: formFields.fName,
      lName: formFields.lName,
      address: formFields.address,
      total: cart.getTotal(),
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${URL}/order`, newOrder);
      // console.log(newOrder);
      // console.log(data);
      navigate("/stripe");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
    }
  };
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <form onSubmit={handleSubmit} onBlur={isValid} className="form">
      <section className="form__title-wrapper">
        <div className="form__section-container form__section-container--title-btn">
          <h2 className="form__title">Your order: £ {cart.getTotal()}</h2>
        </div>
      </section>

      <section className="form__input-container">
        <section className="form__section">
          <div className="form__section-container">
            <h3 className="form__section-title">Your details</h3>

            <label htmlFor="fName" className="form__label">
              First Name
            </label>
            <input
              id="fName"
              type="text"
              className={
                error.fName
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="fName"
              placeholder="Please enter your name..."
              onChange={handleChange}
              value={formFields.fName}
            />
            {error.fName && (
              <span className="form__error">Please enter your name</span>
            )}
            <label htmlFor="lName" className="form__label">
              Last Name
            </label>
            <input
              id="lName"
              type="text"
              className={
                error.lName
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="lName"
              placeholder="Please enter your last name..."
              onChange={handleChange}
              value={formFields.lName}
            />
            {error.lName && (
              <span className="form__error">Please enter your last name</span>
            )}
            <label htmlFor="warehouse-name" className="form__label">
              Address
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
          </div>
        </section>
      </section>
      <section className="form__actions">
        <div className="form__section-container form__section-container--actions">
          <button onClick={() => navigate("/")} className="form__btn">
            Cancel
          </button>
          <button className="form__btn" disabled={!isFormValid}>
            Checkout
          </button>
        </div>
        {!isFormValid && (
          <div className="form__error-all">
            <span>All fields are required</span>
          </div>
        )}
        {/* {error && (
          <div className="form__error-all">
            <span>All fields are required</span>
          </div>
        )} */}
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
