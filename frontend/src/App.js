import { useDispatch } from "react-redux";
import { Routes, Route } from "react-router-dom";
import { setUser } from "./actions";
import { useLayoutEffect } from "react";
import { Header, Footer } from "./components";
import styled from "styled-components";
import {
  Authorization,
  Basket,
  Main,
  Registration,
  AdminPanel,
  Product,
} from "./pages";

const AppColumn = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  margin: 0 auto;
  width: 1250px;
  min-height: 100%;
  background-color: #ffffff;
  font-family: "Comfortaa", cursive;
`;

const Page = styled.div`
  padding: 120px 0 20px;
  // background-color: #edc7b7;
`;

export const App = () => {
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    const currentUserDataJSON = sessionStorage.getItem("userData");
    if (!currentUserDataJSON) {
      return;
    }

    const currentUserData = JSON.parse(currentUserDataJSON);

    dispatch(
      setUser({
        ...currentUserData,
        roleId: Number(currentUserData.roleId),
      })
    );
  }, [dispatch]);

  return (
    <AppColumn>
      <Header />
      <Page>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Authorization />} />
          <Route path="/register" element={<Registration />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/product/:id" element={<Product />} />
        </Routes>
      </Page>
      <Footer />
    </AppColumn>
  );
};

export default App;
