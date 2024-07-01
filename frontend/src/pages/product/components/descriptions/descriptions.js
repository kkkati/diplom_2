import styled from "styled-components";
import { Input } from "../../../../components";

const DescriptionsContainer = (
  { className, product, count, onCountChange },
  ref
) => {
  return (
    <div className={className}>
      <h2>{product.name}</h2>
      <div>Цена: {product.price}</div>
      <div>В наличии: {product.count === 0 ? "нет" : product.count}</div>
      <div>
        Количество:
        <Input
          value={count}
          onChange={onCountChange}
          type="number"
          min="1"
          height="15px"
        ></Input>
      </div>
    </div>
  );
};

export const Descriptions = styled(DescriptionsContainer)``;
