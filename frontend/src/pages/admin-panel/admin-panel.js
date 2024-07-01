import { styled } from "styled-components";
import { AddBlock, EditBlock } from "./components";
import { useEffect, useState } from "react";
import { checkAccess, request } from "../../utils";
import { PAGINATION_LIMIT, ROLE } from "../../constans";
import { Pagination } from "../main/components";
import { useSelector } from "react-redux";
import { selectUserRole } from "../../selectors";
import { H2 } from "../../components";

const AdminPanelContainer = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [categorys, setCategorys] = useState([]);
  const userRole = useSelector(selectUserRole);
  const isAdmin = checkAccess([ROLE.ADMIN], userRole);

  useEffect(() => {
    if (!isAdmin) {
      return;
    }

    request(
      `/products?search=${""}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { products, lastPage } }) => {
      setProducts(products);
      setLastPage(lastPage);
    });
    request(`/categorys`).then(({ data: categorys }) => {
      setCategorys(categorys);
    });
  }, [page, products, isAdmin]);

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
    justify-content: center;
  }

  & .current-page {
    width: 100%;
`;
