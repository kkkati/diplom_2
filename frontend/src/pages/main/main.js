import { useEffect, useMemo, useState } from "react";
import { ProductCard, Pagination, Search, Sort } from "./components";
import { PAGINATION_LIMIT } from "../../constans";
import styled from "styled-components";
import { debounce } from "./utils";
import { request } from "../../utils";
import { Category } from "../../components";

const MainContainer = ({ className }) => {
  const [products, setProducts] = useState([]);
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);
  const [shouldSearch, setShouldSearch] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [sort, setSort] = useState(1);
  const [currentCategory, setCurrentCategory] = useState("Все категории");
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    setIsLoad(true);
    request(
      `/products?search=${searchName}&category=${currentCategory}&sort=${sort}&page=${page}&limit=${PAGINATION_LIMIT}`
    ).then(({ data: { products, lastPage } }) => {
      setProducts(products);
      setLastPage(lastPage);
    });
    setIsLoad(false);
  }, [sort, searchName, page, currentCategory]);

  const startDelayedSearch = useMemo(() => debounce(setShouldSearch, 2000), []);

  const onSearch = ({ target }) => {
    setSearchName(target.value);
    startDelayedSearch(!shouldSearch);
  };

  if (isLoad) {
    return (
      <div className={className}>
        <h2 className="loader">Загузка...</h2>
      </div>
    );
  }
  return (
    <div className={className}>
      <Category
        currentCategory={currentCategory}
        setCurrentCategory={setCurrentCategory}
      />
      <div className="products-and-pagination">
        <div className="products-and-search">
          <Sort sort={sort} setSort={setSort}></Sort>
          <Search onChange={onSearch} searchName={searchName} />
          {}
          {products.length ? (
            <div className="product-list">
              {products.map(({ id, name, imageUrl, price }) => (
                <ProductCard
                  key={id}
                  id={id}
                  name={name}
                  imageUrl={imageUrl}
                  price={price}
                ></ProductCard>
              ))}
            </div>
          ) : (
            <div className="no-products-found">Товары не найдены</div>
          )}
        </div>

        {/* {lastPage > 1 && products.length > 0 && ( */}
        <Pagination page={page} lastPage={lastPage} setPage={setPage} />
        {/* )} */}
      </div>
    </div>
  );
};

export const Main = styled(MainContainer)`
  display: flex;
  justify-content: space-between;

  & .product-list {
    display: flex;
    flex-wrap: wrap;
    padding: 15px 15px 80px;
  }

  & .no-products-found {
    text-align: center;
    font-size: 18px;
    margin-top: 40px;
  }

  & .products-and-pagination {
    display: flex;
    justify-content: center;
    width: 996px;
  }

  & .category {
    display: flex;
    flex-direction: column;
    width: 244px;
    margin: 10px 0 0 10px;
    border: 2px solid #000;
    border-color: #646464;
    border-radius: 3px;
    color: #71079f;
    background-color: #e6e6e6;
  }

  button {
    margin: 10px;
    width: 220px;
  }

  h2 {
    margin: 0;
    text-align: center;
  }

  & .loader {
    margin-left: auto;
    margin-right: auto;
  }
`;

// const ProductList =
//   currentCategory === "Все категории"
//     ? products.map(({ id, name, imageUrl, price }) => (
//         <ProductCard
//           key={id}
//           id={id}
//           name={name}
//           imageUrl={imageUrl}
//           price={price}
//         ></ProductCard>
//       ))
//     : products.map(({ id, name, imageUrl, price }) => (
//         <ProductCard
//           key={id}
//           id={id}
//           name={name}
//           imageUrl={imageUrl}
//           price={price}
//         ></ProductCard>
//       ));
