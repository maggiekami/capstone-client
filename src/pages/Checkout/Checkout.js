import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../../CartContext";
import Cart from "../../components/Cart/Cart";

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

  useEffect(() => {
    async function fetchConfig() {
      // Fetch config from our backend.
      const { unitAmount, currency } = await fetch("/config").then((r) =>
        r.json()
      );
      setAmount(unitAmount);
      setCurrency(currency);
    }
    // fetchConfig();
  }, []);

  const handleStripe = async (event) => {
    event.preventDefault();

    const total = cart.getTotal();

    console.log(total);
    // console.log(event.target.orderTotal.value);
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
    <div className="sr-root">
      <div className="sr-main">
        <section className="container">
          {/* <div>
            <h1>Single photo</h1>
            <h4>Purchase a Pasha original photo</h4>
            <div className="pasha-image">
              <img
                alt="Random asset from Picsum"
                src="https://picsum.photos/280/320?random=4"
                width="140"
                height="160"
              />
            </div>
          </div> */}
          <form
            onSubmit={handleStripe}
            action="http://localhost:8080/create-checkout-session"
            method="POST"
          >
            {/* <input
              type="hidden"
              id="orderTotal"
              min="1"
              max="10"
              // value={cart.getTotal()}
              value="7"
              amount="4000"
              name="orderTotal"
              readOnly
            /> */}
            {/* <div className="quantity-setter">
              <button
                className="increment-btn"
                disabled={quantity === 1}
                onClick={() => setQuantity(quantity - 1)}
                type="button"
              >
                -
              </button>
              <input
                type="number"
                id="quantity-input"
                min="1"
                max="10"
                value={quantity}
                name="quantity"
                readOnly
              />
              <button
                className="increment-btn"
                disabled={quantity === 10}
                onClick={() => setQuantity(quantity + 1)}
                type="button"
              >
                +
              </button>
            </div> */}
            <p>Your total:{cart.getTotal()}</p>
            <button role="link" id="submit" type="submit">
              Make Stripe Payment
            </button>
          </form>
        </section>
      </div>
    </div>
  );
};

export default Checkout;
