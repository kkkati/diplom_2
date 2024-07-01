import { Link, useNavigate } from "react-router-dom";
import { Icon, Button } from "../../../../components";
import { ROLE } from "../../../../constans";
import { useDispatch, useSelector } from "react-redux";
import { selectUserLogin, selectUserRole } from "../../../../selectors";
import { styled } from "styled-components";
import { logout } from "../../../../actions/";
import { checkAccess } from "../../../../utils";

const RightAligner = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin: 10px 10px 10px 0;
`;

const UserName = styled.div`
  font-size: 18px;
  font-weight: bold;
`;

const ControlPanelContainer = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const roleId = useSelector(selectUserRole);
  const login = useSelector(selectUserLogin);

  const onLogout = () => {
    dispatch(logout());
    sessionStorage.removeItem("userData");
  };

  const isAdmin = checkAccess([ROLE.ADMIN], roleId);
  const isAuthUser = checkAccess([ROLE.ADMIN, ROLE.READER], roleId);

  return (
    <div className={className}>
      <RightAligner>
        {roleId === ROLE.GUEST ? (
          <Button margin="10px 0 0 0 ">
            <Link to="/login">Войти</Link>
          </Button>
        ) : (
          <>
            <UserName>{login}</UserName>

            <Icon id="fa-sign-out" margin="0 0 0 10px" onClick={onLogout} />
          </>
        )}
      </RightAligner>
      <RightAligner>
        <Icon id="fa-backward" margin="0 0 0 0" onClick={() => navigate(-1)} />
        {isAuthUser && (
          <Link to="/basket">
            <Icon id="fa-trash" margin="0 0 0 10px" onClick={() => {}} />
          </Link>
        )}
        {isAdmin && (
          <>
            <Link to="/admin">
              <Icon id="fa-cogs" margin="0 0 0 10px" />
            </Link>
          </>
        )}
      </RightAligner>
    </div>
  );
};

export const ControlPanel = styled(ControlPanelContainer)``;
