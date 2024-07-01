import { ControlPanel } from "./components";
import { useNavigate } from "react-router-dom";
import { styled } from "styled-components";

const Discription = styled.div`
  // font-style: italic;
  margin: 30px 0 0 0;
  font-size: 23px;
  font-weight: bold;
  color: #71079f;
  text-align: center;
`;

const Image = styled.img`
  &:hover {
    cursor: ${({ inactive }) => (inactive ? "default" : "pointer")};
  }
`;

const HeaderContainer = ({ className }) => {
  const navigate = useNavigate();
  return (
    <header className={className}>
      <Image
        alt="Лого"
        src="logo1.webp"
        onClick={() => {
          navigate("/");
        }}
      />
      <Discription>
        Доставка товаров
        <br />
        до 30 минут
      </Discription>
      <ControlPanel />
    </header>
  );
};

export const Header = styled(HeaderContainer)`
  display: flex;
  justify-content: space-between;
  position: fixed;
  top: 0;
  width: 1250px;
  height: 120px;
  box-shadow: 1px -2px 17px #000;
  background-color: #e6e6e6;
  z-index: 10;

  img < {
    cursor: curpointer;
  }
`;
