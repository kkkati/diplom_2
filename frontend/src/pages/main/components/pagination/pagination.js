import { Button } from "../../../../components";
import styled from "styled-components";

const PaginationContainer = ({ className, page, lastPage, setPage }) => {
  return (
    <div className={className}>
      <Button disabled={page === 1} onClick={() => setPage(1)}>
        В начало
      </Button>
      <Button disabled={page === 1} onClick={() => setPage(page - 1)}>
        Предыдущая
      </Button>
      <div className="current-page">Страница: {page}</div>
      <Button disabled={page === lastPage} onClick={() => setPage(page + 1)}>
        Следующая
      </Button>
      <Button disabled={page === lastPage} onClick={() => setPage(lastPage)}>
        В конец
      </Button>
    </div>
  );
};

export const Pagination = styled(PaginationContainer)`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 140px;
  width: 70%;
  margin: 0 0 20px 0;
  padding: 0 35px;

  & button {
    margin: 0 5px;
  }

  & .current-page {
    width: 200px;
    height: 30px;
    margin: 10px 5px;
    font-size: 18px;
    font-weight: 500;
    line-height: 25px;
    text-align: center;
    border: 1px solid #000;
  }
`;
