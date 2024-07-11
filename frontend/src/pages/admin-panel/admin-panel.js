import { styled } from "styled-components";
import { AddBlock, EditBlock } from "./components";
import { useEffect, useState } from "react";
import { checkAccess, request } from "../../utils";
import { PAGINATION_LIMIT, ROLE } from "../../constans";
import { Pagination } from "../main/components";
import { useDispatch, useSelector } from "react-redux";
import { selectProducts, selectUserRole } from "../../selectors";
import { H2 } from "../../components";
import { setProducts } from "../../actions";

const AdminPanelContainer = ({ className }) => {
  const products = useSelector(selectProducts);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categorys, setCategorys] = useState([]);
  const userRole = useSelector(selectUserRole);
  const isAdmin = checkAccess([ROLE.ADMIN], userRole);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    request(
      `/products?search=${""}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { products, lastPage } }) => {
      dispatch(setProducts(products));
      setLastPage(lastPage);
    });
    request(`/categorys`).then(({ data: categorys }) => {
      setCategorys(categorys);
    });
  }, [page, isAdmin, products]);

  return (
    <div className={className}>
      {!isAdmin ? (
        <div className="access">
          <H2>У вас нет доступа к данной странице.</H2>
        </div>
      ) : (
        <>
          <AddBlock categorys={categorys} />
          <div className="products-and-pagination">
            <EditBlock products={products} categorys={categorys} />
            <Pagination page={page} lastPage={lastPage} setPage={setPage} />
          </div>
        </>
      )}
    </div>
  );
};

export const AdminPanel = styled(AdminPanelContainer)`
  display: flex;
  justify-contents: center;

& .access {
  margin: 40px auto;
}

  & .products-and-pagination {
    display: flex;
    flex-direction: column;
    // justify-content: center;
  }

  & .current-page {
    width: 100%;
    margin: 0;
`;
