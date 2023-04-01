import { createContext, useState } from "react";
// import productsArray from (ja potrzebuje liste products z axios get wlozona
//     w constant)

export const cartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  clearCart: () => {},
  getTotal: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  const getItemQuantity = (id) => {
    cartItems.find((item) => item.id === id)?.quantity;
    if (quantity === undefined) {
      return 0;
    }
    return quantity;
  };

  const addItemToCart = (id) => {
    const quantity = getItemQuantity(id);
  };

  const contextValue = {
    items: cartItems,
    getItemQuantity,
    addItemToCart,
    removeItemFromCart,
    clearCart,
    getTotal,
  };

  return (
    <cartContext.Provider value={contextValue}>{children}</cartContext.Provider>
  );
}
