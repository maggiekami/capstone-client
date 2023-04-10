import { useState } from "react";
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
    <form onSubmit={handleSubmit} onBlur={isValid}>
      <section className="form__title-wrapper">
        <div className="form__section-container form__section-container--title-btn">
          <h2 className="form__title">Create account</h2>
        </div>
      </section>
      <section className="form__input-container">
        <section className="form__section">
          <div className="form__section-container">
            <h3 className="form__section-title">Your details</h3>

            <label htmlFor="email" className="form__label">
              Email
            </label>
            <input
              id="email"
              type="text"
              className={
                error.email
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="email"
              placeholder="Please enter your email..."
              onChange={handleChange}
              value={formFields.email}
            />
            {error.email && (
              <span className="form__error">
                Invalid email format (ex. 'user@example.com')
              </span>
            )}

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
              placeholder="Please enter your first name..."
              onChange={handleChange}
              value={formFields.fName}
            />
            {error.fName && (
              <span className="form__error">Please enter your first name</span>
            )}

            <label htmlFor="lName" className="form__label">
              Last name
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
              placeholder="Please enter your last name.."
              onChange={handleChange}
              value={formFields.lName}
            />
            {error.lName && (
              <span className="form__error">Please enter your last name</span>
            )}
            <label htmlFor="password" className="form__label">
              Password
            </label>
            <input
              id="password"
              type="text"
              className={
                error.password
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="password"
              placeholder="Please enter your password..."
              onChange={handleChange}
              value={formFields.password}
            />
            {error.password && (
              <span className="form__error">Please enter your password</span>
            )}
            <label htmlFor="passwordConfirmation" className="form__label">
              Confirm password
            </label>
            <input
              id="passwordConfirmation"
              type="text"
              className={
                error.passwordConfirmation
                  ? "form__text-input form__text-input-error"
                  : "form__text-input"
              }
              name="passwordConfirmation"
              placeholder="Please confirm your password..."
              onChange={handleChange}
              value={formFields.passwordConfirmation}
            />
            {formFields.passwordConfirmation !== formFields.password && (
              <span className="form__error">Passwords need to match</span>
            )}
          </div>
        </section>
      </section>
      <section className="form__actions">
        <div className="form__section-container form__section-container--actions">
          <button onClick={() => navigate("/")} className="form__btn">
            Cancel
          </button>
          <button type="submit" className="form__btn" disabled={!isFormValid}>
            Create account
          </button>
        </div>
        {!isFormValid && (
          <div className="form__error-all">
            <span>All fields are required</span>
          </div>
        )}
      </section>
    </form>
  );
};

{
  /* <div>
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
    </div> */
}

export default RegistrationForm;
