import styled from "styled-components";

const FooterContainer = ({ className }) => {
  return (
    <div className={className}>
      <div>
        <div>Интернет-магазин</div>
        <div>shop@kaliningrad.ru</div>
      </div>
    </div>
  );
};

export const Footer = styled(FooterContainer)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 100px;
  padding: 20px 40px;
  font-weight: bold;
  box-shadow: 0px 0px 17px #000;
  background-color: #e6e6e6;
`;
