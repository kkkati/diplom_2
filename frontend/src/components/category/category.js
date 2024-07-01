import { useEffect, useState } from "react";
import styled from "styled-components";
import { request } from "../../utils";
import { Button } from "../button/button";

const CategoryContainer = ({
  className,
  currentCategory,
  setCurrentCategory,
}) => {
  const [categorys, setCategorys] = useState([]);

  useEffect(() => {
    request(`/categorys`).then(({ data: categorys }) => {
      setCategorys(categorys);
    });
  }, []);

  const onClickCategory = ({ target }) => {
    setCurrentCategory(target.innerText);
  };

  return (
    <div className={className}>
      <h2>Категории</h2>
      <div className="category-list">
        {categorys.map(({ id, name }) => (
          <Button key={id} id={id} onClick={onClickCategory}>
            {name}
          </Button>
        ))}
      </div>
    </div>
  );
};

export const Category = styled(CategoryContainer)`
  display: flex;
  flex-direction: column;
  margin: 10px 0 0 10px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  color: #71079f;
  background-color: #e6e6e6;

  button {
    margin: 10px;
    width: 220px;
  }

  h2 {
    margin: 0;
    text-align: center;
  }
`;
