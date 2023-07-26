import { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { getRequest } from "../../utils/network";
import ProductItem from "../ProductItem/ProductItem";
import closeIco from "../../img/close-ico.svg";
import searchingIco from "../../img/searching.png";
import styles from "./SearchPage.module.scss";

const SearchPage = () => {
  const [products, setProducts] = useState([]);
  const [value, setValue] = useState("");
  const url = `https://spring-snap-itei.onrender.com/product/search/${value}`;
  const inputRef = useRef();

  const onChangeInput = (e) => {
    setValue(e.target.value);
  };

  const onClickClear = () => {
    setValue("");
    inputRef.current.focus();
  };

  const getData = () => {
    getRequest(url).then(({ data }) => setProducts(data));
  };

  return (
    <div className={styles.wrap}>
      <div className={styles.cont}>
        <input
          onChange={onChangeInput}
          placeholder="Search"
          ref={inputRef}
          value={value}
        />

        {value && (
          <img
            className={styles.clear}
            onClick={onClickClear}
            src={closeIco}
            alt="clear"
          />
        )}
        <div className={styles.button} onClick={() => getData()}>
          {" "}
          <img src={searchingIco} alt="search" />{" "}
        </div>
      </div>

      <div className={styles.products_cont}>
        {products.map((item, index) => {
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

export default SearchPage;
