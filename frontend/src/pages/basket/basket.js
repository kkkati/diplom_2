import { useDispatch, useSelector } from "react-redux";
import { styled } from "styled-components";
import { selectUserBasket, selectUserRole } from "../../selectors";
import { ProductCardInBasket, SubmitOrder } from "./components";
import { useEffect } from "react";
import { loadUserAsync } from "../../actions";
import { H2 } from "../../components";
import { checkAccess } from "../../utils";
import { ROLE } from "../../constans";

const BasketContainer = ({ className }) => {
  const dispatch = useDispatch();
  const userJSON = sessionStorage.getItem("userData");
  let userId;
  const basket = useSelector(selectUserBasket);
  const roleId = useSelector(selectUserRole);
  const isAuthUser = checkAccess([ROLE.ADMIN, ROLE.READER], roleId);

  if (isAuthUser) {
    userId = JSON.parse(userJSON).id;
  }

  useEffect(() => {
    if (!isAuthUser) {
      return;
    }

    dispatch(loadUserAsync(userId));
  }, [dispatch, userId, basket, isAuthUser]);

  return (
    <div className={className}>
      {!isAuthUser ? (
        <div className="access">
          <H2>У вас нет доступа к данной странице.</H2>
        </div>
      ) : (
        <>
          <div className="produt-and-total">
            <div className="produt-in-basket">
              {basket.length ? (
                basket.map(({ product, count, _id }) => (
                  <ProductCardInBasket
                    key={_id}
                    productIdInBasket={_id}
                    productId={product._id}
                    productName={product.name}
                    productImage={product.image}
                    count={count}
                    price={product.price}
                    userId={userId}
                  />
                ))
              ) : (
                <H2>Корзина пустая</H2>
              )}
            </div>
            <SubmitOrder basket={basket} userId={userId} />
          </div>
        </>
      )}
    </div>
  );
};

export const Basket = styled(BasketContainer)`
  & h2 {
    width: 700px;
    text-align: center;
    margin: 40px auto;
  }

  & .produt-and-total {
    display: flex;
    justify-content: space-between;
  }
`;
