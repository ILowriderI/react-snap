import PropTypes from "prop-types";
import cn from "classnames";
import okIco from "../../img/hand.png";

import styles from "./ModalNewPost.module.scss";

const ModalNewPost = ({ active, setActive, onClickHome, onClickAddMore }) => {
  return (
    <div className={active ? cn(styles.modal, styles.active) : styles.modal}>
      <div
        className={styles.modal_content}
        onClick={(e) => e.stopPropagation()}
      >
        <div className={styles.text}>
          <h3>
            Congratulations! Ad successfully added .{" "}
            <img src={okIco} alt="ok" />{" "}
          </h3>
          <div className={styles.btns}>
            <button onClick={onClickHome}> Home page </button>
            <button onClick={onClickAddMore}> Add one more</button>
          </div>
        </div>
      </div>
    </div>
  );
};

ModalNewPost.propTypes = {
  active: PropTypes.bool,
  onClickHome: PropTypes.func,
  onClickAddMore: PropTypes.func,
  setActive : PropTypes.func
};


export default ModalNewPost;
