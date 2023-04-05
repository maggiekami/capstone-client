import "./Login.scss";
import { useState } from "react";
import axios from "axios";

const URL = process.env.REACT_APP_BACKEND_URL;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // add new user object
    const user = {
      email: event.target.email.value,
      password: event.target.password.value,
    };

    try {
      await axios.post(`${URL}/login`, user);
      // navigate("/");
    } catch (error) {
      setError(error.message);
    }
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
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            name="password"
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginForm;
