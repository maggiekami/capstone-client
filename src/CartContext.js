import { createContext, useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

export const CartContext = createContext({
  items: [],
  getItemQuantity: () => {},
  addItemToCart: () => {},
  removeItemFromCart: () => {},
  removeAllFromCart: () => {},
  getTotal: () => {},
  // fetchItemData: () => {},
});

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [cartProduct, setCartProduct] = useState({});

  useEffect(() => {
    const storedCartItems = localStorage.getItem("cartItems");
    if (storedCartItems) {
      setCartItems(JSON.parse(storedCartItems));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const { productId } = useParams();

  const fetchItemData = async (productId) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/product/${productId}`
      );
      setCartProduct(response.data);
      console.log(response.data);
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

  const addItemToCart = (id) => {
    const quantity = getItemQuantity(id);
    const itemData = fetchItemData(id);
    if (quantity === 0) {
      setCartItems([
        ...cartItems,
        {
          // how to get name of actual item here
          // name: "mk",
          ...cartProduct,
          id: id,
          quantity: 1,
          // name: itemData.name,
        },
      ]);
      // shows empty array in console
    } else {
      setCartItems(
        cartItems.map(
          (item) =>
            item.id === id ? { ...item, quantity: item.quantity + 1 } : item
          // it was ...item instead of cartProduct
        )
      );
    }
    console.log(cartItems);
    // console.log(itemData);
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

  // const getTotal = () => {
  //   let total = 0;
  //   cartItems.map((item) => {
  //     // getItemDetails(item.id) here instead of cartitems
  //     const itemDetails = getCartItemDetails(item.id);
  //     return (total += itemDetails.price * item.quantity);
  //   });
  // };

  const contextValue = {
    items: cartItems,
    getItemQuantity,
    addItemToCart,
    removeItemFromCart,
    removeAllFromCart,
    // getTotal,
    // fetchItemData,
  };

  return (
    <CartContext.Provider value={contextValue}>{children}</CartContext.Provider>
  );
}

export default CartProvider;
