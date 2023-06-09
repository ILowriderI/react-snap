import  PropTypes from 'prop-types';
import SavedButton from "../buttons/SavedButton/SavedButton";
import erImg from "../../img/default-img.jpg" 
import styles from "./ProductItem.module.scss";

const ProductItem = ({ item }) => {
  const date = item.dateOfCreated;
  const url = item.imageList.length !== 0 ? item.imageList[0].url : erImg;


  return (
    <div className={styles.wrap}>
      <img className={styles.img} src={url} alt="preview image" />
      <div className={styles.title}>{item.title}</div>
      <div>{item.price} $</div>
      <div>{item.city}</div>
      <div className={styles.right}>
        {date[2]}.{date[1]}.{date[0]}
      </div>
      <div className={styles.right}>
        {" "}
        {date[3]}:{date[4]}
      </div>
      <SavedButton productId={item.id} />
    </div>
  );
};

ProductItem.propTypes = {
  item: PropTypes.object,
}

export default ProductItem;
