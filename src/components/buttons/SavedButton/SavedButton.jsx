import  PropTypes from 'prop-types';
import { isTokenPresent } from "../../../utils/token";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { getRequestWithToken } from "../../../utils/network";
import ico from "../../../img/like.png";
import icoFill from "../../../img/like-fill.png";
import styles from "./SavedButton.module.scss";

const SavedButton = ({ productId }) => {
  const token = useSelector((state) => state.tokenReducer.item.access_token);
  const userId = useSelector((state) => state.tokenReducer.item.userId);
  const [isProductAdded, setIsProductAdded] = useState();

  const getSavedUrl = `https://spring-snap-itei.onrender.com/cart/${userId}`;
  const saveUrl = `https://spring-snap-itei.onrender.com/cart/add/${userId}/${productId}`;
  const removeUrl = `https://spring-snap-itei.onrender.com/cart/remove/${userId}/${productId}`;

  const chekAddedProduct = () => {
    getRequestWithToken(getSavedUrl, token).then(({ data }) => {
      if (data.length === 0) {
        setIsProductAdded(false);
        return;
      }
      data.forEach((element) => {
        if (element.id === productId) {
          setIsProductAdded(true);
        }
      });
    });
  };

  useEffect(() => {
    if(isTokenPresent()) chekAddedProduct();
  }, [isProductAdded]);

  const saveProduct = () => {
    getRequestWithToken(saveUrl, token);
    setIsProductAdded(true);
  };

  const removeProduct = () => {
    getRequestWithToken(removeUrl, token);
    setIsProductAdded(false);
  };

  const onSavedOrRemove = (e) => {
    e.preventDefault();
    e.stopPropagation();
    e.nativeEvent.stopImmediatePropagation();
    isProductAdded ? removeProduct() : saveProduct();
  };

  return (
    <>
      {isTokenPresent() ? (
        <img
          className={styles.btn}
          onClickCapture={(e) => onSavedOrRemove(e)}
          src={isProductAdded ? icoFill : ico}
          alt="add"
        />
      ) : (
        ""
      )}
    </>
  );
};

SavedButton.propTypes = {
  productId: PropTypes.number,
}

export default SavedButton;
