import ico from "../../img/oops.png";
import styles from "./SimpleErrorMessage.module.scss";

const SimpleErrorMessage = () => {
  return (
    <div className={styles.msg}>
      something went wrong, please try again
      <img src={ico} alt="oops" />
    </div>
  );
};

export default SimpleErrorMessage;
