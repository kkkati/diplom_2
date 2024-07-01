import { useDispatch, useSelector, useStore } from "react-redux";
import { useNavigate, useParams } from "react-router";
import styled from "styled-components";
import { selectProduct, selectUserId } from "../../selectors";
import { useEffect, useState } from "react";
import { loadProductAsync, addProductToBasketAsync } from "../../actions";
import { AuthFormError, Button, Error, Input } from "../../components";
import { Link } from "react-router-dom";
import { Descriptions } from "./components";
import { selectUser } from "../../selectors/select-user";

const ProductContainer = ({ className }) => {
  const [error, setError] = useState(null);
  const params = useParams();
  const dispatch = useDispatch();
  const product = useSelector(selectProduct);
  const userId = useSelector(selectUserId);
  const [count, setCount] = useState(1);
  const navigate = useNavigate();
  const [formError, setFormError] = useState("");

  useEffect(() => {
    dispatch(loadProductAsync(params.id)).then((productData) => {
      setError(productData.error);
    });
  }, [dispatch, params.id]);

  const addProductToUserOnCLick = (userId, productId, count) => {
    if (!count) {
      setFormError("Введите количество товара");
      return;
    }
    dispatch(addProductToBasketAsync(userId, productId, count));

    alert("Товар успешно добавлен в корзину");
    setCount(1);
    setFormError("");
  };

  const onCountChange = ({ target }) => setCount(target.value);

  return error ? (
    <Error error={error} />
  ) : (
    <div className={className}>
      <div className="img-block">
        <img src={product.imageUrl} alt={product.name} />
      </div>
      <div className="product-descriptions-block">
        <Descriptions
          product={product}
          count={count}
          onCountChange={onCountChange}
        />
        {userId ? (
          <>
            <Button
              disabled={product.count === 0}
              width="100px"
              margin="10px 0 0 0 "
              onClick={() =>
                addProductToUserOnCLick(userId, params.id, Number(count))
              }
            >
              Купить
            </Button>
            {formError && (
              <AuthFormError width="310px">{formError}</AuthFormError>
            )}
          </>
        ) : (
          <Button
            width="100px"
            margin="10px 0 0 0 "
            onClick={() => navigate("/login")}
          >
            Войти
          </Button>
        )}
      </div>
    </div>
  );
};

export const Product = styled(ProductContainer)`
  display: flex;
  justify-content: space-between;
  width: 800px;
  margin-left: auto;
  margin-right: auto;
  margin-top: 20px;
  height: 450px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  color: #000;
  background-color: #e6e6e6;

  & .img-block {
    position: relative;
    width: 400px;
  }

  img {
    position: absolute;
    top: 225px;
    left: 50px;
    transform: translate(0, -50%);
  }

  & .product-descriptions-block {
    // position: relative;
    margin-top: 80px;
    margin-left: 10px;
    width: 400px;
  }
`;
