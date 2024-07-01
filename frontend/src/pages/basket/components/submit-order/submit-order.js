import { styled } from "styled-components";
import { Button } from "../../../../components";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteBasketAsync,
  loadProductAsync,
  saveEditProductAsync,
} from "../../../../actions";

const SubmitOrderContainer = ({ className, basket, userId }) => {
  const [sumTotal, setSumTotal] = useState(0);
  const dispatch = useDispatch();

  useEffect(() => {
    setSumTotal(0);
    basket.forEach(({ product, count }) => {
      if (product.price) {
        setSumTotal((sumTotal) => Number(sumTotal) + product.price * count);
      }
    });
  }, [basket]);

  const onDeleteBasket = () => {
    basket.forEach(({ product, count }) => {
      dispatch(loadProductAsync(product._id)).then((productData) => {
        dispatch(
          saveEditProductAsync(product._id, {
            count: productData.data.count - count,
          })
        );
      });
    });
    dispatch(deleteBasketAsync(userId));
    alert("Заказ успешно оформлен");
  };

  return (
    <div className={className}>
      <div>Итого:</div>
      <div>{sumTotal}</div>
      <Button
        disabled={basket.length === 0}
        width="200px"
        onClick={onDeleteBasket}
      >
        Оформить заказ
      </Button>
    </div>
  );
};

export const SubmitOrder = styled(SubmitOrderContainer)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 20px;
  width: 260px;
  height: 250px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  color: #000;
  background-color: #e6e6e6;
  font-size: 18px;

  & .price {
    margin: 10px;
  }

  & button {
    margin: 10px;
  }
`;
