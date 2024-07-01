import styled from "styled-components";

const AuthFormErrorContainer = ({ children, className, width, ...props }) => {
  return (
    <div className={className} {...props}>
      {children}
    </div>
  );
};

export const AuthFormError = styled(AuthFormErrorContainer)`
  margin: 10px 0 0;
  padding: 10px;
  font-size: 18px;
  background-color: #fcadad;
  width: ${({ width = "auto" }) => width};
`;
