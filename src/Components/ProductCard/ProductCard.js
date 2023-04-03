import "./ProductCard.scss";
import { CartContext } from "../../CartContext";
import { useContext } from "react";

const ProductCard = ({ product }) => {
  const cart = useContext(CartContext);
  const productQuantity = cart.getItemQuantity(product.id);
  return (
    <article>
      <div>
        <img className="card__img" src={product.image} alt="product" />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
        {productQuantity > 0 ? <p>In your bag: {productQuantity}</p> : null}
      </div>
      <button onClick={() => cart.addItemToCart(product.id)}>Add to bag</button>
      <button onClick={() => cart.removeItemFromCart(product.id)}>
        Remove from bag
      </button>
      {/* <button onClick={() => console.log(product)}>Add to bag</button> */}
    </article>
  );
};

export default ProductCard;
