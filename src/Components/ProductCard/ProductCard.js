import "./ProductCard.scss";

const ProductCard = ({ product }) => {
  return (
    <article>
      <div>
        {/* <p>product info here</p> */}
        <img className="card__img" src={product.image} alt="product" />
        <h3>{product.name}</h3>
        <p>{product.price}</p>
      </div>
    </article>
  );
};

export default ProductCard;
