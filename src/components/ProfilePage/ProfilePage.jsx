import { useEffect, useState } from "react";
import { useSelector ,useDispatch} from "react-redux";
import { removeUser } from "../../redux/slices/userSlice";
import { removeToken } from "../../redux/slices/tokenSlice";
import { isTokenPresent } from "../../utils/token";
import { getRequestWithToken } from "../../utils/network";
import LoginPage from "../LoginPage/LoginPage";
import ProfileProduct from "../ProfileProduct/ProfileProduct";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import Loader from "../Loader/Loader";
import logoutIco from "../../img/logout.png";
import styles from "./ProfilePage.module.scss";

const ProfilePage = () => {
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const userId = useSelector((state) => state.tokenReducer.item.userId);
  const [userProducts, setUserProducts] = useState([]);
  const [isDelete, setIsDelete] = useState(false);
  const [isLogout, setIsLogout] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError,setIsError] = useState(false)
  const dispatch = useDispatch();

  const urlGetUser = `https://spring-snap-itei.onrender.com/user/${userId}`;
  const urlLogout = "https://spring-snap-itei.onrender.com/auth/logout"

  const getProductList = () => {
    getRequestWithToken(urlGetUser,token)
      .then(({ data }) =>setUserProducts(data.productList))
      .catch(()=>setIsError(true));
      setIsLoading(false)
  };

  const onLogout = () => {
    getRequestWithToken(urlLogout,token);
    dispatch(removeUser());
    dispatch(removeToken());
    setIsLogout(true);
  };

  const deleteProduct = (urlDeleteProduct) => {
    getRequestWithToken(urlDeleteProduct,token)
      .then(() => {
        setIsDelete(true);
        setIsLoading(false);
      });
  };

  useEffect(() => {
    getProductList();
  }, [isDelete, isLogout]);

  if (!isTokenPresent()) return <LoginPage />;
  
  return (
    <div className={styles.wrap}>
      <button onClick={() => onLogout()} className={styles.button}>
        {" "}
        Logout <img src={logoutIco} alt="logout" />{" "}
      </button>
      {isError? <ErrorMessage/> : ""}
      {userProducts.length === 0 ? (
        <h2> You dont have advertisement</h2>
      ) : (
        <h2>Your advertisement</h2>
      )}
      {isLoading ? <Loader /> : ""}
      {userProducts.map((item, index) => {
        return (
          <ProfileProduct
            key={index}
            data={item}
            deleteProduct={deleteProduct}
          />
        );
      })}
    </div>
  );
};
export default ProfilePage;
