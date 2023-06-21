import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = "https://renee-crafts-server-8898dc1bcd4a.herokuapp.com";

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState(initialValues);
  const [isFormValid, setIsFormValid] = useState(true);
  const [error, setError] = useState("");

  const navigate = useNavigate();

  const isValid = () => {
    if (!formFields.email || !formFields.password) {
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

  const handleSubmit = async (event) => {
    event.preventDefault();
    isValid();

    const user = {
      email: formFields.email,
      password: formFields.password,
    };

    try {
      const response = await axios.post(`${URL}/auth/login`, user);
      const token = response.data.token;
      localStorage.setItem("token", token);
      navigate("/");
    } catch (error) {
      setError(error.message);
    }
  };
  return (
    <form onSubmit={handleSubmit} onBlur={isValid}>
      <section className="form__title-wrapper">
        <div className="form__section-container form__section-container--title">
          <h2 className="form__title">Sign in</h2>
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
          </div>
        </section>
      </section>
      <section className="form__actions">
        <div className="form__section-container form__section-container--actions">
          <button onClick={() => navigate("/")} className="form__btn">
            Cancel
          </button>
          <button type="submit" className="form__btn" disabled={!isFormValid}>
            Login
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

export default LoginForm;
