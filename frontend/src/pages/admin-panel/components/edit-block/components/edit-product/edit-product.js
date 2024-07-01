import styled from "styled-components";
import { Icon, Input } from "../../../../../../components";
import { useLayoutEffect, useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteProductAsync,
  saveEditProductAsync,
} from "../../../../../../actions";

const EditProductContainer = ({
  className,
  product: { id, name, category, imageUrl, price, count },
  categorys,
}) => {
  const [nameValue, setNameValue] = useState(name);
  const [selectedCategoryValue, setSelectedCategoryValue] = useState(category);
  const [imageUrlValue, setImageUrlValue] = useState(imageUrl);
  const [priceValue, setPriceValue] = useState(price);
  const [countValue, setCountValue] = useState(count);

  useLayoutEffect(() => {
    setNameValue(name);
    setSelectedCategoryValue(category);
    setImageUrlValue(imageUrl);
    setPriceValue(price);
    setCountValue(count);
  }, [name, category, imageUrl, price, count]);

  const dispatch = useDispatch();

  const onSave = () => {
    dispatch(
      saveEditProductAsync(id, {
        name: nameValue,
        category: selectedCategoryValue,
        imageUrl: imageUrlValue,
        price: priceValue,
        count: countValue,
      })
    );
    alert("Изменения успешно сохранены.");
  };

  const onDelete = () => {
    dispatch(deleteProductAsync(id));
    alert("Товар успешно удален.");
  };

  const onNameChange = ({ target }) => setNameValue(target.value);

  const onCategoryChange = ({ target }) =>
    setSelectedCategoryValue(target.value);

  const onImageChange = ({ target }) => setImageUrlValue(target.value);

  const onPriceChange = ({ target }) => setPriceValue(target.value);

  const onCountChange = ({ target }) => setCountValue(target.value);

  return (
    <div className={className}>
      <Input
        margin="5px 5px 10px 5px"
        width="100%"
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
        margin="5px 5px 10px 5px"
        width="100%"
        value={imageUrlValue}
        onChange={onImageChange}
      />
      <Input
        margin="5px 5px 10px 5px"
        width="100%"
        value={priceValue}
        onChange={onPriceChange}
      />
      <Input
        margin="5px 5px 10px 5px"
        width="100%"
        value={countValue}
        onChange={onCountChange}
      />
      <Icon id="fa-floppy-o" margin="5px 0 0 5px" onClick={onSave} />
      <Icon id="fa-trash-o" margin="5px 5px 0 10px" onClick={onDelete} />
    </div>
  );
};

export const EditProduct = styled(EditProductContainer)`
  display: flex;

  & select {
    width: 100%;
    margin: 5px 5px 10px 5px;
    padding: 5px;
    font-size: 18px;
    border: 2px solid #000;
    border-color: #646464;
    border-radius: 3px;
    color: #000000;
  }
`;
