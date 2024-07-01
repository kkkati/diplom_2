import { useState } from "react";
import styled from "styled-components";

const SortContainer = ({ className, sort, setSort }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);
  const list = ["возростанию", "убыванию"];
  const sortName = list[selected];

  const onCLickListItem = (i) => {
    setSelected(i);
    i === 0 ? setSort(1) : setSort(-1);
    setOpen(false);
  };

  return (
    <div className={className}>
      <div className="sort-label">
        <b>Сортировка по:</b>
        <span onClick={() => setOpen(!open)}>{sortName}</span>
      </div>
      {open && (
        <div className="sort-popup">
          <ul>
            {list.map((name, i) => (
              <li
                key={i}
                onClick={() => onCLickListItem(i)}
                className={selected === i ? "active" : ""}
              >
                {name}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export const Sort = styled(SortContainer)`
  position: relative;

  & .sort-label {
    display: flex;
    align-items: center;
    position: absolute;
    left: 730px;
    top: 50px;
  }

  & b {
    margin-right: 8px;
  }

  & span {
    border-bottom: 1px dashed #71079f;
    cursor: pointer;
  }

  & .sort-popup {
    position: absolute;
    right: 0;
    margin-top: 15px;
    background: #ffffff;
    box-shadow: 0px 5px 15px #e6e6e6;
    border-radius: 10px;
    overflow: hidden;
    padding: 10px 0;
  }

  & ul {
    overflow: hidden;
  }

  & li {
    padding: 5px 5px;
    cursor: pointer;
  }

  & .active,
  &:hover {
    background: #e6e6e6;
  }

  & .active {
    font-weight: bold;
    color: #71079f;
  }
`;
