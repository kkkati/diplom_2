import { Input, Icon } from "../../../../components";
import styled from "styled-components";

const SearchContainer = ({ className, searchName, onChange }) => {
  return (
    <div className={className}>
      <Input
        value={searchName}
        placeholder="Поиск по названию..."
        onChange={onChange}
        height="35px"
      />
      <Icon inactive={true} id="fa-search" size="21px" />
    </div>
  );
};

export const Search = styled(SearchContainer)`
  display: flex;
  position: relative;
  width: 340px;
  height: 40px;
  margin: 40px auto 0;

  & > input {
    width: 340px;
    padding: 3px 32px 5px 10px;
  }

  & > div {
    position: absolute;
    top: 7px;
    right: 8px;
  }
`;
