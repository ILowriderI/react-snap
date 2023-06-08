import  PropTypes from 'prop-types';
import img from "../../../img/unicorn.png";
import styles from "./ConfirmButton.module.scss";

const ConfirmButton = ({ text, onClick, disabled }) => {
  return (
    <button disabled={disabled} onClick={onClick} className={styles.btn}>
      {" "}
      {text} <img src={img} alt="image" />
    </button>
  );
};

ConfirmButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool, 
}

export default ConfirmButton;
