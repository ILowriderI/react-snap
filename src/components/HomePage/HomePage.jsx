import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/network";
import ProductItem from "../ProductItem/ProductItem";
import SkeletonProductItem from "../ProductItem/SkeletonProductItem";
import UIButton from "../buttons/UIButton/UIButton";
import ErrorMessage from "../ErrorMessage/ErrorMessage"
import rightArrow from "../../img/arrow-right.png";
import leftArrow from "../../img/arrow-left.png";
import styles from "./HomePage.module.scss";

const HomePage = () => {
  const [currentPage, setCurrentPage] = useState();
  const [totalPages, setTotalPages] = useState();
  const [totalItems, setTotalItems] = useState(0);
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const urlFirstPage = "https://spring-snap-itei.onrender.com/products?pageNumber=0&size=8";
  const urlNextPage = `https://spring-snap-itei.onrender.com/products?pageNumber=${ currentPage + 1}&size=8`;
  const urlPreviousPage = `https://spring-snap-itei.onrender.com/products?pageNumber=${ currentPage + 1 }&size=8`;

  const getData = () => {
    getRequest(urlFirstPage)
      .then(({ data }) => {
        console.log(data);
        setTotalItems(data.total_items);
        setProducts(data.products);
        setTotalPages(data.total_pages);
        setCurrentPage(data.current_page);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  };

  useEffect(() => {
    getData();
  }, []);

  const onNextPage = () => {
    setIsLoading(true);

    getRequest(urlNextPage)
      .then(({ data }) => {
        setProducts(data.products);
        setCurrentPage(data.current_page);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
    window.scrollTo(0, 0);
  };
  const onPreviousPage = () => {
    setIsLoading(true);

    getRequest(urlPreviousPage)
      .then(({ data }) => {
        setProducts(data.products);
        setCurrentPage(data.current_page);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
    window.scrollTo(0, 0);
  };

 if(isError) return <ErrorMessage/>
 
  return (
    <div className={styles.wrap}>
      <div className={styles.header}>
        Total ads : <span>{totalItems}</span>
      </div>

      <div className={styles.products_cont}>
        {isLoading
          ? [...new Array(6)].map((_, index) => (
              <SkeletonProductItem key={index} />
            ))
          : ""}

        {products.map((item, index) => {
          return (
            <Link key={index} to={`/product/${item.id}`}>
              <ProductItem item={item} />
            </Link>
          );
        })}
      </div>
      <div className={styles.buttons}>
        <UIButton
          img={leftArrow}
          onClick={onPreviousPage}
          disabled={currentPage === 0}
        />
        <UIButton
          img={rightArrow}
          onClick={onNextPage}
          disabled={currentPage + 1 === totalPages}
        />
      </div>
    </div>
  );
};
export default HomePage;
