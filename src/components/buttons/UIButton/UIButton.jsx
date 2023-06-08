import PropTypes from "prop-types";
import styles from "./UIButton.module.scss";

const UIButton = ({ text, onClick, disabled, img }) => {
  return (
    <>
      <button disabled={disabled} onClick={onClick} className={styles.btn}>
        {" "}
        {text} <img src={img} alt="img" />
      </button>
    </>
  );
};

UIButton.propTypes = {
  text: PropTypes.string,
  onClick: PropTypes.func,
  disabled: PropTypes.bool,
};

export default UIButton;
