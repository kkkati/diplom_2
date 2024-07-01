import { forwardRef } from "react";
import styled from "styled-components";

const InputContainer = forwardRef(
  ({ classname, width, height, margin, type, ...props }, ref) => {
    return (
      <input type={type} className={classname} {...props} ref={ref}></input>
    );
  }
);

export const Input = styled(InputContainer)`
  width: ${({ width = "auto" }) => width};
  height: ${({ height = "auto" }) => height};
  margin: ${({ margin = "0 0 10px" }) => margin};
  // margin: 0 0 10px;
  padding: 5px;
  font-size: 18px;
  border: 2px solid #000;
  border-color: #646464;
  border-radius: 3px;
`;
