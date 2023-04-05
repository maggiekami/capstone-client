import { useState } from "react";
// import sha256 from "crypto-js/sha256";
import { useNavigate } from "react-router-dom";
import "./Register.scss";
import axios from "axios";
import * as yup from "yup";

const URL = process.env.REACT_APP_BACKEND_URL;

const schema = yup.object().shape({
  email: yup.string().email().required(),
  fName: yup.string().required(),
  lName: yup.string().required(),
  password: yup.string().required(),
  passwordConfirmation: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Please confirm your password"),
});

const RegistrationForm = () => {
  const initialValues = {
    email: "",
    fName: "",
    lName: "",
    password: "",
    passwordConfirmation: "",
  };

  const [formFields, setFormFields] = useState(initialValues);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isFormValid, setIsFormValid] = useState(true);
  const navigate = useNavigate();

  const isValid = () => {
    if (
      !formFields.email ||
      !formFields.fName ||
      !formFields.lName ||
      !formFields.password ||
      !formFields.passwordConfirmation
    ) {
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
    // isValid();

    const newUser = {
      email: formFields.email,
      fName: formFields.fName,
      lName: formFields.lName,
      password: formFields.password,
      //   passwordConfirmation: formFields.passwordConfirmation,
    };

    try {
      setIsLoading(true);
      const { data } = await axios.post(`${URL}/auth/register`, newUser);
      console.log(newUser);
      console.log(data);
      navigate("/login");
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
      <h2>Signup</h2>
      <form onSubmit={handleSubmit} onBlur={isValid}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            name="email"
            // className={
            //     error.email
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="email"
            onChange={handleChange}
            value={formFields.email}
            placeholder="Email"
          />
          {error.email && (
            <span className="form__error">
              Invalid email format (ex. 'user@example.com')
            </span>
          )}
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
          {error.fName && (
            <span className="form__error">This field is required</span>
          )}
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
          {error.lName && (
            <span className="form__error">This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            name="password"
            // className={
            //     error.address
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="password"
            value={formFields.password}
            onChange={handleChange}
            placeholder="Password"
          />
          {error.password && (
            <span className="form__error">This field is required</span>
          )}
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password</label>
          <input
            type="password"
            name="passwordConfirmation"
            // className={
            //     error.passwordConfirmation
            //       ? "form__text-input form__text-input-error"
            //       : "form__text-input"
            //   }
            id="passwordConfirmation"
            value={formFields.passwordConfirmation}
            onChange={handleChange}
            placeholder="Confirm password"
          />
          {formFields.passwordConfirmation !== formFields.password && (
            <span className="form__error">Passwords need to match</span>
          )}
        </div>
        <div>
          <button type="submit" disabled={!isFormValid}>
            Register
          </button>
          {!isFormValid && (
            <span className="form__error">All fields are required</span>
          )}
        </div>
      </form>
    </div>
  );
};

export default RegistrationForm;
