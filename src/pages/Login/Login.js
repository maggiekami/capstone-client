import "./Login.scss";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const URL = process.env.REACT_APP_BACKEND_URL;

const LoginForm = () => {
  const initialValues = {
    email: "",
    password: "",
  };
  const [formFields, setFormFields] = useState("");
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

  const handleSubmit = (e) => {
    e.preventDefault();

    const user = {
      email: formFields.email,
      password: formFields.password,
    };
    axios
      .post(`${URL}/login`, user)
      .then((res) => {
        console.log(res);
        const { token } = res.data;
        sessionStorage.setItem("authToken", token);
      })
      .then(navigate("/"))
      .catch((err) => console.log(err));
  };
  //   setEmail("");
  //   setPassword("");

  // alert("Registration successful.");

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            // value={formFields.email}
            onChange={handleChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            // value={formFields.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
