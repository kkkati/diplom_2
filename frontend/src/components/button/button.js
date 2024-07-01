import styled from "styled-components";

const ButtonContainer = ({ children, className, width, ...props }) => {
  return (
    <button className={className} {...props}>
      {children}
    </button>
  );
};

export const Button = styled(ButtonContainer)`
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: "Comfortaa", cursive;
  font-size: 18px;
  width: ${({ width = "100%" }) => width};
  margin: ${({ margin = "0" }) => margin};
  height: 32px;
  color: #000;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
  background-color: #d3d3d3;

  &:hover {
    cursor: ${({ disabled }) => (disabled ? "default" : "pointer")};
  }
`;
