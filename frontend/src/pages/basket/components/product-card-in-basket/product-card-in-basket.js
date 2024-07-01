import { styled } from "styled-components";
import { Icon, Input } from "../../../../components";
import { useDispatch } from "react-redux";
import {
  addProductToBasketAsync,
  deleteProductInBasketAsync,
} from "../../../../actions";
import { useState } from "react";

const ProductCardInBasketContainer = ({
  className,
  productIdInBasket,
  productId,
  productName,
  productImage,
  count,
  price,
  userId,
}) => {
  const [countValue, setCountValue] = useState(count);

  const dispatch = useDispatch();

  const onDeleteProductInBasket = () => {
    dispatch(deleteProductInBasketAsync(userId, productIdInBasket));
  };

  const onCountChange = ({ target }) => {
    setCountValue(target.value);
    dispatch(addProductToBasketAsync(userId, productId, 1));
  };

  return (
    <div className={className}>
      <img src={productImage} alt={productName} width="130px" height="98px" />
      <div className="produt-in-basket">
        <div>Наименование: {productName}</div>
        <div>
          Количество:
          <Input
            value={countValue}
            onChange={onCountChange}
            type="number"
            min="1"
            height="12px"
            width="40px"
          ></Input>
        </div>
        {/* <div>Количество: {count}</div> */}
        <div>Цена: {isNaN(price * count) ? "" : price * count}</div>
      </div>
      <div className="icon">
        <Icon
          id="fa-trash-o"
          margin="0 0 0 0"
          onClick={onDeleteProductInBasket}
        />
      </div>
    </div>
  );
};

export const ProductCardInBasket = styled(ProductCardInBasketContainer)`
  display: flex;
  margin: 20px;
  width: 900px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  color: #000;
  background-color: #e6e6e6;
  font-size: 18px;

  & .img {
    margin: 10px;
  }

  & .produt-in-basket {
    margin: 10px;
  }

  & .icon {
    margin: 10px 10px 10px auto;
  }

  & input {
    font-size: 17px;
    margin: 0;
  }
`;
