import React, { useState } from "react";
import sha256 from "crypto-js/sha256";

const RegistrationForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handlePasswordConfirmationChange = (event) => {
    setPasswordConfirmation(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (password !== passwordConfirmation) {
      alert("Passwords do not match.");
      return;
    }

    const hashedPassword = sha256(password);
    console.log(hashedPassword.toString()); // Prints: 2ef7bde608ce5404e97d5f042f95f89f1c232871dfcc1e1d7be6c1e70f0d2d38

    // const hashedPassword = bcrypt.hashSync(password, 10);

    // Send the email and hashed password to your backend for storage
    // You can use a library like axios to make HTTP requests
    // For example: axios.post("/api/register", { email, password: hashedPassword })

    // Clear the form fields
    setEmail("");
    setPassword("");
    setPasswordConfirmation("");

    alert("Registration successful.");
  };

  return (
    <div>
      <h2>Signup</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="passwordConfirmation">Confirm Password:</label>
          <input
            type="password"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handlePasswordConfirmationChange}
            required
          />
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default RegistrationForm;
