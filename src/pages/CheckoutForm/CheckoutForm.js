import { useContext, useState } from "react";
import { CartContext } from "../../CartContext";
import axios from "axios";
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
  //   const [isFormValid, setIsFormValid] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [error, setError] = useState("");

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
      //   navigate("/login");
    } catch (error) {
      setIsLoading(false);
      setError(error.message);
      console.log("wrong on client");
      console.log(error.message);
    }
  };

  //     alert("Registration successful.");
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>Checkout</h2>
      <form
        onSubmit={handleSubmit}
        //   onBlur={isValid}
      >
        <div>
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            // className={
            //     error.email
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="address"
            onChange={handleChange}
            value={formFields.email}
            placeholder="Email"
          />
          {/* {error.email && (
            <span className="form__error">
              Invalid email format (ex. 'user@example.com')
            </span>
          )} */}
        </div>
        <div>
          <label htmlFor="fName">First Name</label>
          <input
            type="text"
            name="fName"
            // className={
            //     error.fName
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="fName"
            value={formFields.fName}
            onChange={handleChange}
            placeholder="First name"
          />
          {/* {error.fName && (
            <span className="form__error">This field is required</span>
          )} */}
        </div>
        <div>
          <label htmlFor="lName">Last Name</label>
          <input
            type="text"
            name="lName"
            // className={
            //     error.lName
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="lName"
            value={formFields.lName}
            onChange={handleChange}
            placeholder="Last name"
          />
          {/* {error.lName && (
            <span className="form__error">This field is required</span>
          )} */}
        </div>
        <div>
          <label htmlFor="total">Total</label>
          <input
            type="text"
            name="total"
            onChange={handleChange}
            // className={
            //     error.address
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="total"
            value={cart.getTotal()}
          />
        </div>
        <div>
          <button
            type="submit"
            //   disabled={!isFormValid}
          >
            Checkout
          </button>
          {/* {!isFormValid && (
            <span className="form__error">All fields are required</span>
          )} */}
        </div>
      </form>
    </div>
  );
};

export default CheckoutForm;
