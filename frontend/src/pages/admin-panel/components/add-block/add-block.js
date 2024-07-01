import { styled } from "styled-components";
import { Button, Input } from "../../../../components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { addProductAsync } from "../../../../actions";

const AddBlockContainer = ({ className, categorys }) => {
  const [nameValue, setNameValue] = useState("");
  const [selectedCategoryValue, setSelectedCategoryValue] = useState("");
  const [imageUrlValue, setImageUrlValue] = useState();
  const [priceValue, setPriceValue] = useState("");
  const [countValue, setCountValue] = useState("");

  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(
      addProductAsync({
        name: nameValue,
        category: selectedCategoryValue,
        imageUrl: imageUrlValue,
        price: priceValue,
        count: countValue,
      })
    );
    alert("Товар успешно добавлен.");
  };

  const onNameChange = ({ target }) => setNameValue(target.value);

  const onCategoryChange = ({ target }) =>
    setSelectedCategoryValue(target.value);

  const onImageChange = ({ target }) => setImageUrlValue(target.value);

  const onPriceChange = ({ target }) => setPriceValue(target.value);

  const onCountChange = ({ target }) => setCountValue(target.value);

  return (
    <div className={className}>
      <h2>Добавление товара</h2>
      <div className="input-block">
        <Input
          margin="10px 0 10px 10px"
          placeholder="Наимнование"
          value={nameValue}
          onChange={onNameChange}
        />
        <select value={selectedCategoryValue} onChange={onCategoryChange}>
          {categorys.map(({ _id, name }) => (
            <option key={_id} value={name}>
              {name}
            </option>
          ))}
        </select>
        <Input
          margin="10px 0 10px 10px"
          placeholder="Изображение"
          value={imageUrlValue}
          onChange={onImageChange}
        />
        <Input
          margin="10px 0 10px 10px"
          placeholder="Цена"
          value={priceValue}
          onChange={onPriceChange}
        />
        <Input
          margin="10px 0 10px 10px"
          placeholder="Количество"
          value={countValue}
          onChange={onCountChange}
        />
      </div>
      <Button width="233px" margin="0 0 10px 0 " onClick={onSave}>
        Добавить
      </Button>
    </div>
  );
};

export const AddBlock = styled(AddBlockContainer)`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 244px;
  margin: 10px 0 0 10px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  color: #71079f;
  background-color: #e6e6e6;

  & h2 {
    margin: 0;
    text-align: center;
  }

  & input {
    margin-right: 10px;
  }

  & select {
    width: 233px;
    margin: 5px 5px 10px 10px;
    padding: 5px;
    font-size: 18px;
    border: 2px solid #000;
    border-color: #646464;
    border-radius: 3px;
    color: #000000;
  }
`;
