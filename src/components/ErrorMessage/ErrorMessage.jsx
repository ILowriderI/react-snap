import video from "./video/han-solo.mp4";
import styles from "./ErrorMessage.module.scss";
const ErrorMessage = () => {

  return (
    <div className={styles.wrap}>
      We cannot display data <br />
      Come back when we fix everithing <br />
      <video  loop autoPlay muted>
        {" "}
        <source src={video} />
      </video>
    </div>
  );
};

export default ErrorMessage;
