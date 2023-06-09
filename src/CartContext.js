import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const CartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeAllFromCart: () => {},
  getTotal: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");

    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    // Only update local storage if the cart has items
    if (cartItems.length !== 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const fetchItemData = async (productId) => {
    try {
      const response = await axios.get(
        `https://renee-crafts-server-8898dc1bcd4a.herokuapp.com/product/${productId}`
      );
      return response.data;
    } catch (error) {
      console.log(`Error fetching item data for ID ${productId}:`);
    }
  };

  const getItemQuantity = (id) => {
    const quantity = cartItems.find((item) => item.id === id)?.quantity;

    if (quantity === undefined) {
      return 0;
    }

    return quantity;
  };

  const addItemToCart = async (id) => {
    const quantity = getItemQuantity(id);
    const itemData = await fetchItemData(id);

    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          ...itemData,
          id: id,
          quantity: 1,
          name: itemData[0].name,
          price: itemData[0].price,
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

    cartItems.forEach((item) => {
      total += item.price * item.quantity;
    });

    return total;
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
