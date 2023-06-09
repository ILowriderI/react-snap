import  PropTypes from 'prop-types';
import deleteIco from "../../img/delete.png";
import errImg from "../../img/default-img.jpg"
import styles from "./ProfileProduct.module.scss";

const ProfileProduct = ({ data, deleteProduct }) => {
 
  const img = data.imageList.length === 0 ? errImg : data.imageList[0].url;

  return (
    <div className={styles.wrap}>
      <img src={img} alt="" />
      <span>Title : {data.title}</span>
      <span>
        Date : {data.dateOfCreated[2]}.{data.dateOfCreated[1]}.
        {data.dateOfCreated[0]}{" "}
      </span>
      <span>
        {" "}
        {data.dateOfCreated[3]}:{data.dateOfCreated[4]}{" "}
      </span>

      <img
        className={styles.button}
        onClick={() =>
          deleteProduct(`https://snap-trade.onrender.com/product/delete/${data.id}`)
        }
        src={deleteIco}
        alt="delete"
        title="delete"
      />
    </div>
  );
};
ProfileProduct.propTypes = {
  data: PropTypes.array,
  deleteProduct: PropTypes.func
}

export default ProfileProduct;
