import { createContext, useState, useEffect } from "react";
import { getItemDetails } from "../src/pages/Products/Products";

export const CartContext = createContext({
  items: [],

  getItemQuantity: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeAllFromCart: () => {},
  getTotal: () => {},
});

export function CartProvider({ children }) {
  //   const [cartItems, setCartItems] = useState([]);
  const [cartItems, setCartItems] = useState(() => {
    const savedCartItems = localStorage.getItem("cartItems");
    if (savedCartItems) {
      return JSON.parse(savedCartItems);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const getItemDetails = (id) => {
    let itemDetails = cartItems.find((item) => item.id === id);
    if (itemDetails == undefined) {
      return undefined;
    }
    return itemDetails;
  };

  const getItemQuantity = (id) => {
    const quantity = cartItems.find((item) => item.id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addItemToCart = (id) => {
    const quantity = getItemQuantity(id);
    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          id: id,
          quantity: 1,
        },
      ]);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
  };

  const removeAllFromCart = (id) => {
    setCartItems((cartItems) =>
      cartItems.filter((item) => {
        return item.id !== id;
      })
    );
  };

  const removeItemFromCart = (id) => {
    const quantity = getItemQuantity(id);
    if (quantity === 1) {
      removeAllFromCart(id);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        )
      );
    }
  };

  const getTotal = () => {
    let total = 0;
    cartItems.map((item) => {
      const itemDetails = getItemDetails(item.id);
      return (total += itemDetails.price * item.quantity);
    });
  };

  const contextValue = {
    items: cartItems,
    getItemQuantity,
    addItemToCart,
    removeItemFromCart,
    removeAllFromCart,
    getTotal,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
