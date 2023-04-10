import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./Checkout.scss";
import { CartContext } from "../../CartContext";

const formatPrice = ({ amount, currency, quantity }) => {
  const numberFormat = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    currencyDisplay: "symbol",
  });
  const parts = numberFormat.formatToParts(amount);
  let zeroDecimalCurrency = true;
  for (let part of parts) {
    if (part.type === "decimal") {
      zeroDecimalCurrency = false;
    }
  }
  amount = zeroDecimalCurrency ? amount : amount / 100;
  const total = (quantity * amount).toFixed(2);
  return numberFormat.format(total);
};

const Checkout = () => {
  const [quantity, setQuantity] = useState(1);
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState("USD");
  const cart = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchConfig() {
      const { unitAmount, currency } = await fetch("/config").then((r) =>
        r.json()
      );
      setAmount(unitAmount);
      setCurrency(currency);
    }
  }, []);

  const handleStripe = async (event) => {
    event.preventDefault();

    const total = cart.getTotal();

    try {
      const response = await axios.post(
        "http://localhost:8080/create-checkout-session",
        {
          orderTotal: total,
        }
      );

      window.location.assign(response.data.url);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleStripe}
      action="http://localhost:8080/create-checkout-session"
      method="POST"
    >
      <section className="form__title-wrapper">
        <div className="form__section-container form__section-container--title">
          <h2 className="form__title">Checkout securely</h2>
        </div>
      </section>
      <section className="form__input-container">
        <section className="form__section">
          <div className="form__section-container">
            <h3 className="form__section-title">
              Your total: £ {cart.getTotal()}
            </h3>
          </div>
        </section>
      </section>
      <section className="form__actions">
        <div className="form__section-container form__section-container--actions">
          <button onClick={() => navigate("/")} className="form__btn">
            Cancel
          </button>
          <button
            role="link"
            id="submit"
            className="form__stripe-connect"
            type="submit"
          >
            <span className="form__stripe-txt">
              Connect with <span className="form__stripe-name"> STRIPE</span>{" "}
            </span>
          </button>
        </div>
      </section>
    </form>
  );
};

export default Checkout;
