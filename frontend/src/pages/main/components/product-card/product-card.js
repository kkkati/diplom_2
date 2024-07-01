import { Link } from "react-router-dom";
import styled from "styled-components";

const ProductCardContainer = ({ className, id, name, imageUrl, price }) => {
  return (
    <div className={className}>
      <Link to={`/product/${id}`}>
        <img src={imageUrl} alt={name} />
        <div className="product-card-footer">
          <h4>{name}</h4>
          <div className="product-card-info">
            <div>Цена {price}</div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export const ProductCard = styled(ProductCardContainer)`
  display: flex;
  flex-direction: column;
  width: 280px;
  margin: 20px;
  border: 1px solid #000;

  & img {
    display: block;
    width: 100%;
  }

  & .product-card-footer {
    padding: 5px;
    border-top: 1px solid #000;
  }

  & h4 {
    margin: 0;
  }

  & .product-card-info {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
  }
`;
