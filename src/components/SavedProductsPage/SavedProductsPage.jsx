import { isTokenPresent } from "../../utils/token";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getRequestWithToken } from "../../utils/network";
import ProfilePage from "../ProfilePage/ProfilePage";
import ProductItem from "../ProductItem/ProductItem";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import styles from "./SavedProductsPage.module.scss";

const SavedProductsPage = () => {
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const userId = useSelector((state) => state.tokenReducer.item.userId);
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);

  const url = `http://localhost:8080/cart/${userId}`;
  useEffect(() => {
    
    if(isTokenPresent())
    getRequestWithToken(url, token)
      .then(({ data }) => {
        setData(data);
        setIsLoading(false);
      })
      .catch(() => setIsError(true));
  }, []);

  if (!isTokenPresent()) return <ProfilePage />;
  return (
    <div className={styles.wrap}>
      {data.length === 0 ? (
        <h2>You haven't selected any ads, rather pick up something</h2>
      ) : (
        <h2>Saved ads</h2>
      )}
      {isError ? <ErrorMessage /> : ""}
      {isLoading ? <Loader /> : ""}
      <div className={styles.products_cont}>
        {data.map((item, index) => {
          return (
            <Link key={index} to={`/product/${item.id}`}>
              <ProductItem item={item} />
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default SavedProductsPage;
