// import "./CartItem.scss";
// import { CartContext } from "../../CartContext";
// import { useContext } from "react";
// // import { getItemDetails } from "../../pages/Products/Products";

// const CartItem = (props) => {
//   const cart = useContext(CartContext);
//   const id = props.id;
//   const quantity = props.quantity;
//   // const productData = getItemDetails(id);
//   return (
//     <>
//       <article className="cart__item">
//         <img
//           src={productData.img}
//           alt={productData.name}
//           className="cart__item-img"
//         />
//         <div>
//           <h4>{productData.name}</h4>
//           <p className="cart__price">
//             ${(quantity * productData.price).toFixed(2)}
//           </p>
//           {/* remove button */}
//           <button
//             className="remove-btn"
//             onClick={() => cart.removeAllFromCart(cart.product.id)}
//           >
//             X
//           </button>
//         </div>
//         <div>
//           {/* increase amount */}
//           <button
//             className="amount-btn"
//             onClick={() => cart.addItemToCart(cart.product.id)}
//           >
//             +
//           </button>
//           {/* amount */}
//           <p className="cart__quantity">{cart.productQuantity}</p>
//           {/* decrease amount */}
//           <button
//             className="amount-btn"
//             onClick={() => cart.removeItemFromCart(cart.product.id)}
//           >
//             -
//           </button>
//         </div>
//       </article>
//     </>

//     /* <article>
//       <h1>card</h1>
//       <price>3.33</price>
//       <button onClick={() => cart.addItemToCart(product.id)}>
//         add to basket
//       </button>
//     </article> */
//   );
// };
// export default CartItem;
