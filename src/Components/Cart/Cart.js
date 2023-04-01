import React from "react";

const Cart = () => {
  return (
    <section className="cart">
      <header>
        <h2>your bag</h2>
      </header>
      <div>
        {/* {cart.map((item) => {
      return <CartItem key={item.id} {...item} />
    })} */}
      </div>
      {/* cart footer */}
      <footer>
        <hr />
        <div className="cart-total">
          <h4>{/* total <span>${total}</span> */}</h4>
        </div>
        {/* <button className="btn clear-btn" onClick={clearCart}> */}
        {/* clear cart */}
        {/* </button> */};
      </footer>
    </section>
  );
};

export default Cart;
