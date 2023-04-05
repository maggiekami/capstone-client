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
    // Only update local storage IF the card has items
    if (cartItems.length !== 0) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

  const fetchItemData = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/${productId}`
      );

      return response.data;
      console.log("fetch context working");
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
    console.log(quantity);
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
        console.log(itemData),
      ]);
    } else {
      setCartItems(
        cartItems.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item
        )
      );
    }
    console.log(cartItems);
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

  // nie wiadomo czy tak ta funckja ma dzialac bo skad ma byc price w cartitems,
  //  ale musi tu byc narazie i zmieniona w gettotal bo wyskakuje blad

  // const getCartItemDetails = (id) => {
  //   let itemDetails = cartItems.find((item) => item.id === id);
  //   if (itemDetails === undefined) {
  //     return undefined;
  //   }
  //   return itemDetails;
  // };

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
    // fetchItemData,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
