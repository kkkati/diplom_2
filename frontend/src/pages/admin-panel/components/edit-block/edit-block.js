import { styled } from "styled-components";
import { EditProduct } from "./components/edit-product/edit-product";

const EditBlockContainer = ({ className, products, categorys }) => {
  return (
    <div className={className}>
      <div className="name-input">
        <div>Наименование</div>
        <div>Категория</div>
        <div>Изображение</div>
        <div>Цена</div>
        <div>Количество</div>
      </div>
      <div className="input-block">
        {products.length ? (
          products.map((product) => (
            <EditProduct product={product} categorys={categorys} />
          ))
        ) : (
          <div>Товаров нет.</div>
        )}
      </div>
    </div>
  );
};

export const EditBlock = styled(EditBlockContainer)`
  display: flex;
  flex-direction: column;
  margin: 10px 10px 50px 10px;
  width: 970px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  background-color: #e6e6e6;

  & .name-input {
    display: flex;
    width: 860px;
    justify-content: space-around;
    color: #71079f;
  }
`;
